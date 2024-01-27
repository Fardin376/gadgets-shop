import Container from '@/app/components/Container';
import { getCurrentUser } from '@/services/getCurrentUser';
import Error from '@/app/components/Error';
import Notification from '@/app/components/Notification';
import getOrdersByUserId from '@/services/getOrdersByUserId';
import OrdersClient from './OrdersClient';

export const dynamic = 'force-dynamic';

async function Orders() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <Error title="You are not authorized to view this page." />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <Error title="You have not made any purchase yet." />;
  }

  return (
    <div className="manage-orders-page-wrapper">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
      <Notification />
    </div>
  );
}
export default Orders;
