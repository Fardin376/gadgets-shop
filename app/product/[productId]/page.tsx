import Container from '@/app/components/Container';
import ProductDetailsComponent from './ProductDetailsComponent';
import ListRating from '@/app/components/products/ListRating';
import getProductById from '@/services/getProductById';
import Error from '@/app/components/Error';
import AddRating from './AddRating';
import { getCurrentUser } from '@/services/getCurrentUser';

interface IPrams {
  productId?: string;
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage({
  params,
}: {
  params: IPrams;
}) {
  const product = await getProductById(params);

  const user = await getCurrentUser();

  if (!product) {
    return <Error title="Product of this id does not exist" />;
  }

  return (
    <div className="product-details-page-wrapper">
      <Container>
        <ProductDetailsComponent product={product} />
        <div className="product-rating-wrapper">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}
