import Container from '@/app/components/Container';
import FormWrap from '@/app/components/FormWrap';
import AddProductForm from '../../components/products/AddProductForm';
import { getCurrentUser } from '@/services/getCurrentUser';
import Error from '@/app/components/Error';
import Notification from '@/app/components/Notification';

export const dynamic = 'force-dynamic'

async function AddProduct() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <Error title="You are not authorized to view this page." />;
  }

  return (
    <div className="add-product-page-wrapper">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
      <Notification />
    </div>
  );
}
export default AddProduct;
