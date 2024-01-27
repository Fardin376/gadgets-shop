import Container from '@/app/components/Container';
import ManageProductsClient from '../../components/products/ManageProductsClient';
import getProducts from '@/services/getProducts';
import { getCurrentUser } from '@/services/getCurrentUser';
import Error from '@/app/components/Error';
import Notification from '@/app/components/Notification';

export const dynamic = 'force-dynamic';

async function ManageProducts() {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <Error title="You are not authorized to view this page." />;
  }

  return (
    <div className="manage-products-page-wrapper">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
      <Notification />
    </div>
  );
}
export default ManageProducts;
