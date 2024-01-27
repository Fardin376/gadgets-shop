'use client';

import {
  CartProductType,
  SelectedImgType,
} from '@/app/product/[productId]/ProductDetailsComponent';
import Image from 'next/image';

function ProductImage({
  cartProduct,
  product,
  handleColorSelect,
}: {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}) {
  return (
    <div className="product-image-wrapper-grid">
      <div className="product-image-options">
        {product.images.map((image: SelectedImgType) => (
          <div
            key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`product-image-options-active ${
              cartProduct.selectedImg.color === image.color
                ? 'border-[1.5px]'
                : 'border-none'
            }`}
          >
            <Image
              src={image.image}
              alt={image.color}
              fill
              objectFit="contain"
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="product-display-image">
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          fill
          objectFit="contain"
          className="product-display-image-active"
        />
      </div>
    </div>
  );
}
export default ProductImage;
