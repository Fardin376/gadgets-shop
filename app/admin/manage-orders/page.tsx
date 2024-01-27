import Container from '@/app/components/Container';
import { getCurrentUser } from '@/services/getCurrentUser';
import Error from '@/app/components/Error';
import Notification from '@/app/components/Notification';
import ManageOrdersClient from '../../components/products/ManageOrdersClient';
import getOrders from '@/services/getOrders';
import getUsers from '@/services/getUsers';

export const dynamic = 'force-dynamic';

async function ManageOrders() {
  const currentUser = await getCurrentUser();
  const orders = await getOrders();
  const users = await getUsers()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <Error title="You are not authorized to view this page." />;
  }

  return (
    <div className="manage-products-page-wrapper">
      <Container>
        <ManageOrdersClient orders={orders} users={users}/>
      </Container>
      <Notification />
    </div>
  );
}
export default ManageOrders;
