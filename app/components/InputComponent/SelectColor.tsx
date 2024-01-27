'use client';

import { ImageType } from '@/app/components/products/AddProductForm';
import { useEffect, useState } from 'react';
import SelectImage from './SelectImage';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

function SelectColor({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}: {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = (value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  };

  const handleCheck = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(ev.target.checked);

    if (!ev.target.checked) {
      setFile(null);
      removeImageFromState(item);
    }
  };

  return (
    <div className="select-color-grid">
      <div className="select-color-checkbox">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="color-label">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="select-image-wrapper">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}

        {file && (
          <div className="uploaded-image-wrapper">
            <p>{file?.name}</p>
            <div className="cancel-uploaded-image-btn">
              <ButtonComponent
                label="Cancel"
                small
                outline
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
}
export default SelectColor;
