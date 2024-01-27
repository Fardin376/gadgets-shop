'use client';

import Image from 'next/image';
import { CartProductType } from '../../product/[productId]/ProductDetailsComponent';
import Link from 'next/link';
import { formatPrice } from '@/utils/utils';
import { truncateText } from '@/utils/truncateText';
import SetQuantity from '../products/SetQuantity';
import { useGlobalState } from '@/context/context';

function ItemContent({ item }: { item: CartProductType }) {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useGlobalState();

  return (
    <div key={item.id} className="product-in-cart-grid">
      <div className="product-col flex items-center">
        <div className="product-image">
          <Link href={`/product/${item.id}`}>
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              width="60"
              height="60"
            />
          </Link>
        </div>
        <div className="product-details">
          <Link href={`/product/${item.id}`}>
            <span>{truncateText(item.name)}</span>
          </Link>
          <div className="product-details-info">
            <span>{item.selectedImg.color}</span>
          </div>
          <button
            onClick={() => {
              handleRemoveProductFromCart(item);
            }}
            className="cart-remove-product-btn"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="price-col">
        <span className="product-price">{formatPrice(item.price)}</span>
      </div>
      <div className="quantity-col">
        <span className="product-quantity">
          <SetQuantity
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() => {
              handleCartQtyIncrease(item);
            }}
            handleQtyDecrease={() => {
              handleCartQtyDecrease(item);
            }}
          />
        </span>
      </div>
      <div className="total-col">
        <span className="product-total">
          {(item.price * item.quantity).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
    </div>
  );
}
export default ItemContent;
