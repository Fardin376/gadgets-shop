'use client';

import { useGlobalState } from '@/context/context';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Notification from '../Notification';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import debounce from 'lodash.debounce';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutClient() {
  const [mounted, setMounted] = useState(true);
  const { cartProducts, paymentIntent, handleSetPaymentIntent } =
    useGlobalState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (mounted) {
      const debouncedFetch = debounce(async () => {
        if (cartProducts || paymentIntent) {
          setLoading(true);
          setError(false);

          try {
            const res = await fetch('/api/create-payment-intent', {
              method: 'POST',
              headers: {
                'Content-Type': 'Application/JSON',
                'cache-control': 'no-cache',
              },
              body: JSON.stringify({
                items: cartProducts,
                payment_intent_id: paymentIntent,
              }),
            });

            setLoading(false);

            if (res.status === 401) {
              return router.push('/login');
            }

            if (res.status !== 200) {
              setError(true);
              toast.error('Error creating payment intent');
            }

            console.log('res:', res);

            const data = await res.json();
            console.log('data:', data);
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
          } catch (err) {
            setError(true);
            console.log('err:', err);
            toast.error('Error creating payment intent');
          }
        }
      }, 50); // Adjust the debounce time as needed

      debouncedFetch();
    }

    setMounted(false);
  }, [cartProducts, paymentIntent, handleSetPaymentIntent, mounted, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  };

  const handleSetPaymentSuccess = (value: boolean) => {
    setPaymentSuccess(value);
  };

  return (
    <div className="checkout-client-wrapper">
      {clientSecret && paymentIntent && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {!loading && !paymentIntent && (
        <div className="checkout-loading">
          You have no products in cart. Please add products to cart to view
          checkout form.
        </div>
      )}
      {loading && paymentIntent && (
        <div className="checkout-loading">Loading Checkout Page....</div>
      )}
      {error && <div className="checkout-error">Something went wrong....</div>}
      {paymentSuccess && (
        <div className="payment-success-wrapper">
          <div className="payment-success-message">Payment Successful</div>
          <div className="view-order-btn">
            <ButtonComponent
              label="View Your Orders"
              onClick={() => router.push('/orders')}
            />
          </div>
        </div>
      )}
      <Notification />
    </div>
  );
}

export default CheckoutClient;
