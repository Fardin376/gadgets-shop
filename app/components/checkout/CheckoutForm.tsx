'use client';

import { useGlobalState } from '@/context/context';
import { formatPrice } from '@/utils/utils';
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Heading from '../Heading';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

function CheckoutForm({
  clientSecret,
  handleSetPaymentSuccess,
}: {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}) {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useGlobalState();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          toast.success('Payment Successful');

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <Heading title="CHECKOUT" center />

      <h2 className="checkout-shipping">Shipping Address</h2>
      <AddressElement options={{ mode: 'shipping' }} />
      <h2 className="checkout-payment-details">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <div className="checkout-payment-price">Total: {formattedPrice}</div>
      <ButtonComponent
        label={isLoading ? 'Processing' : 'Pay Now'}
        disabled={isLoading}
        onClick={() => {}}
      />
    </form>
  );
}
export default CheckoutForm;
