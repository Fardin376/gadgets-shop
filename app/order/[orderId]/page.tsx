import Container from '@/app/components/Container';
import OrderDetailsComponent from './OrderDetailsComponent';
import getOrderById from '@/services/getOrderById';
import Error from '@/app/components/Error';


interface IPrams {
  orderId?: string;
}

export default async function OrderDetailsPage({ params }: { params: IPrams }) {
  const order = await getOrderById(params);

  if (!order) {
    return <Error title="You have no orders" />;
  }

  return (
    <div className="order-details-page-wrapper">
      <Container>
        <OrderDetailsComponent order={order} user={order.user}/>
      </Container>
    </div>
  );
}
