'use client';

import ButtonComponent from '@/app/components/ButtonComponent/ButtonComponent';
import Heading from '@/app/components/Heading';
import CategorySelect from '@/app/components/InputComponent/CategorySelect';
import CustomCheckbox from '@/app/components/InputComponent/CustomCheckbox';
import InputComponent from '@/app/components/InputComponent/InputComponent';
import SelectColor from '@/app/components/InputComponent/SelectColor';
import TextArea from '@/app/components/InputComponent/TextArea';
import firebaseApp from '@/libs/firebase';
import { categories, colors } from '@/utils/utils';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      inStock: false,
      images: [],
    },
  });

  useEffect(() => {
    setCustomValue('images', images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Product data:', data);
    //upload images to firebase
    //save product to mongodb
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error('Product Category is not selected!');
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error('Product Image is not selected!');
    }

    const handleImageUploads = async () => {
      toast('Creating product, please wait...');

      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);

            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (error) => {
                  console.log('Error uploading image:', error);

                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL): void => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });

                      console.log('File available at', downloadURL);
                      resolve();
                    })
                    .catch((error): void => {
                      console.log('Error getting the download URL', error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log('Error handling image uploads', error);
        return toast.error('Error handling image uploads');
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };

    axios
      .post('/api/product', productData)
      .then(() => {
        toast.success('Product created');
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error('Unexpected error occurred');
      })
      .finally(() => setIsLoading(false));
  };

  const category = watch('category');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromState = (value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }

      return prev;
    });
  };

  return (
    <>
      <Heading title="Add a Product" center />
      <InputComponent
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <InputComponent
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <InputComponent
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      <div className="select-category-wrapper">
        <div className="select-category-header">Select a Category</div>
        <div className="select-category-grid">
          {categories.map((item) => {
            if (item.label === 'All') {
              return null;
            }

            return (
              <div key={item.label}>
                <CategorySelect
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="select-image-wrapper">
        <div>
          <div className="select-image-header">
            Select the available product colors and upload their images.
          </div>
          <div className="select-image-p">
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored.
          </div>
        </div>
        <div className="color-code-images">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <ButtonComponent
        label={isLoading ? 'Loading...' : 'Add Product'}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
}
export default AddProductForm;
