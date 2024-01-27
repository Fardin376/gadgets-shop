'use client';

import {
  CartProductType,
  SelectedImgType,
} from '@/app/product/[productId]/ProductDetailsComponent';
import { useGlobalState } from '@/context/context';

function SetColor({
  images,
  cartProduct,
  handleColorSelect,
}: {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}) {

  return (
    <div
      className={`product-details-setColor-wrapper`}
    >
      <span>COLOR : </span>
      <div className="product-details-setColor-section">
        {images.map((image) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`product-details-setColor-wrapper-color ${
                cartProduct.selectedImg.color === image.color
                  ? 'border-[2px]'
                  : 'border-none'
              }`}
            >
              <div
                style={{ background: image.colorCode }}
                className="product-details-setColor-color-circle"
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SetColor;
