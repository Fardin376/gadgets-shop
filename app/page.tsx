export const revalidate = 0;

import Container from './components/Container';
import HomePageBanner from './components/HomePageBanner';
import ProductCard from './components/products/ProductCard';
import getProducts, { IProductParams } from '@/services/getProducts';
import Error from './components/Error';

export default async function Home({
  searchParams,
}: {
  searchParams: IProductParams;
}) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <Error title="No products found. Click All to clear filters" />;
  }

  //fisher-yates shuffle algorithm
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div>
      <Container>
        <div>
          <HomePageBanner />
        </div>
        <div className="product-card-grid">
          {shuffledProducts.map((product: any) => (
            <ProductCard data={product} key={product.id} />
          ))}
        </div>
      </Container>
    </div>
  );
}
