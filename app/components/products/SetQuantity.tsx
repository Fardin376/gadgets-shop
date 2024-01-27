'use client';

import { CartProductType } from '@/app/product/[productId]/ProductDetailsComponent';
import { useGlobalState } from '@/context/context';

function SetQuantity({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}: {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}) {


  return (
    <div className="setQuantity-wrapper">
      {cartCounter ? null : (
        <div
          className={`product-details-reviews`}
        >
          <span>QUANTITY : </span>
        </div>
      )}
      <div className="setQuantity-section">
        <button onClick={handleQtyDecrease} className={`qtyButton`}>
          -
        </button>
        <div className={`setQuantity-section-qty`}>
          <span>{cartProduct.quantity}</span>
        </div>
        <button onClick={handleQtyIncrease} className={`qtyButton`}>
          +
        </button>
      </div>
    </div>
  );
}
export default SetQuantity;
