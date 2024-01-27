'use client';

import { useGlobalState } from '@/context/context';
import { useRouter } from 'next/navigation';
import { CiShoppingCart } from 'react-icons/ci';

function CartCount() {
  const router = useRouter();
  const { cartTotalQty } = useGlobalState();

  return (
    <div className="cart-icon-wrapper" onClick={() => router.push('/cart')}>
      <div className="cart-icon">
        <CiShoppingCart color={'#000'} />
      </div>
      <span className="cart-icon-quantity">{cartTotalQty}</span>
    </div>
  );
}
export default CartCount;
