import Container from '../components/Container';
import FormWrap from '../components/FormWrap';
import CheckoutClient from '../components/checkout/CheckoutClient';

export const dynamic = 'force-dynamic';

function Checkout() {
  return (
    <div className="checkout-page-wrapper">
      <Container>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Container>
    </div>
  );
}
export default Checkout;
