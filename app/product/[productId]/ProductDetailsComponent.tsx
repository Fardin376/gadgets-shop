'use client';

import ButtonComponent from '@/app/components/ButtonComponent/ButtonComponent';
import ProductImage from '@/app/components/products/ProductImage';
import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import { useGlobalState } from '@/context/context';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import Notification from '@/app/components/Notification';

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="horizontal-line" />;
};

function ProductDetailsComponent({ product }: { product: any }) {
  const { handleAddProductToCart, cartProducts } = useGlobalState();

  const [isProductInCart, setIsProductInCart] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex !== -1) {
        setIsProductInCart(true);
        toast.success(
          'Product has been added to cart. Please increase the quantity from the cart if you want to add more than one product'
        );
      }
    }
  }, [cartProducts]);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  console.log(cartProducts);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = (value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  };

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return null;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return null;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <>
      <div className="product-details-component-grid">
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
        <div className="product-details-component-grid-content">
          <h1 className={`product-details-component-title`}>{product.name}</h1>
          <div className="product-details-component-reviews">
            <Rating
              value={productRating}
              readOnly
              precision={0.5}
              size="large"
              sx={{ color: '#FFBB00' }}
            />
            <div className={`product-details-reviews`}>
              {product.reviews.length} reviews
            </div>
          </div>
          <Horizontal />
          <div className={`product-details-component-grid-content-description`}>
            {product.description}
          </div>
          <Horizontal />
          <div className={`product-details-reviews`}>
            <span className="">CATEGORY : </span>
            {product.category}
          </div>
          <div className={`product-details-reviews`}>
            <span className="">BRAND : </span>
            {product.brand}
          </div>
          <div className={`${product.inStock ? 'inStock' : 'notInStock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
          <Horizontal />
          {isProductInCart ? (
            <>
              <p className="product-added-to-cart">
                <FaCircleCheck
                  color="#00C853"
                  size={30}
                  className="mb-2 circle-check"
                />
                <span>Product added to cart</span>
              </p>
              <div className="product-details-button-wrapper">
                <ButtonComponent
                  label="View Cart"
                  outline
                  onClick={() => {
                    router.push('/cart');
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
              <Horizontal />
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
              <Horizontal />
              <div className="product-details-button-wrapper">
                {product.inStock ? (
                  <ButtonComponent
                    label="Add To Cart"
                    onClick={() => handleAddProductToCart(cartProduct)}
                  />
                ) : (
                  <ButtonComponent
                    label="Add To Cart"
                    disabled={true}
                    onClick={() => handleAddProductToCart(cartProduct)}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <Notification />
      </div>
    </>
  );
}
export default ProductDetailsComponent;
