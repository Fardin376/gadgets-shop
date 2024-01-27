'use client';

import { useGlobalState } from '@/context/context';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Heading from '../Heading';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import ItemContent from './ItemContent';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';
import { formatPrice } from '@/utils/utils';

function CartClient({ currentUser }: { currentUser: SafeUser | null }) {
  const { cartProducts, handleClearCart, cartTotalAmount } = useGlobalState();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="cart-empty">
        <h1 className={` cart-empty-title`}>Your cart is empty</h1>
        <Link href="/" className={`} cart-empty-link`}>
          <MdArrowBack size={20} color={'#000'} />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Heading title="Shopping Cart" center />
      <div className="shopping-cart-grid">
        <div className="product-col">PRODUCT</div>
        <div className="price-col">PRICE</div>
        <div className="quantity-col">QUANTITY</div>
        <div className="total-col">TOTAL</div>
      </div>

      {cartProducts &&
        cartProducts.map((item) => <ItemContent key={item.id} item={item} />)}

      <div className="cart-total">
        <div className="clear-cart-button">
          <ButtonComponent
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            outline
            small
          />
        </div>
        <div className="cart-subTotal-taxes">
          <div className="cart-subtotal-span">
            <span>SubTotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="cart-subtotal-p">
            Taxes and shipping will be calculated at checkout
          </p>
          <ButtonComponent
            label={currentUser ? 'Checkout' : 'Login to Checkout'}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push('/checkout') : router.push('/login');
            }}
          />
          <Link href="/" className={`cart-empty-link`}>
            <MdArrowBack size={20} color={'#000'} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </>
  );
}
export default CartClient;
