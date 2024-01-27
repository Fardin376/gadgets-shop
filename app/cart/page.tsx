import Container from '../components/Container';
import CartClient from '../components/cart/CartClient';
import Notification from '../components/Notification';
import { getCurrentUser } from '@/services/getCurrentUser';

export const dynamic = 'force-dynamic';

async function CartPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="cart-section">
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
      <Notification />
    </div>
  );
}

export default CartPage;
