'use client';

import { ImageType } from '@/app/components/products/AddProductForm';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function SelectImage({
  item,
  handleFileChange,
}: {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
  });

  return (
    <div {...getRootProps()} className="upload-image-box-wrapper">
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here</p> : <p>+ {item?.color} Image</p>}
    </div>
  );
}
export default SelectImage;
