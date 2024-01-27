'use client';

import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import { formatPrice } from '@/utils/utils';
import { Order, User } from '@prisma/client';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md';
import OrderItem from './OrderItem';

function OrderDetailsComponent({ order, user }: { order: Order; user: User }) {
  //  const router = useRouter();

  return (
    <div className="order-details-component-wrapper">
      <div className="order-details-component-head">
        <Heading title="Order Details" />
      </div>
      <div>Customer Name: {user.name}</div>
      <div>Order ID: {order.id}</div>
      <div>
        Total Amount:{' '}
        <span className="order-price">{formatPrice(order.amount / 100)}</span>
      </div>
      <div className="order-payment-status">
        <div>Payment Status:</div>
        <div>
          {order.status === 'pending' ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="product-pending"
              color="product-pending"
            />
          ) : order.status === 'complete' ? (
            <Status
              text="Completed"
              icon={MdDone}
              bg="product-delivered"
              color="product-delivered"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="order-payment-status">
        <div>Delivery Status:</div>
        <div>
          {order.deliveryStatus === 'pending' ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg="product-pending"
              color="product-pending"
            />
          ) : order.deliveryStatus === 'dispatched' ? (
            <Status
              text="Dispatched"
              icon={MdDeliveryDining}
              bg="product-dispatched"
              color="product-dispatched"
            />
          ) : order.deliveryStatus === 'delivered' ? (
            <Status
              text="Delivered"
              icon={MdDone}
              bg="product-delivered"
              color="product-delivered"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        Date: {order.createdDate.toDateString()} (
        {moment(order.createdDate).fromNow()})
      </div>
      <div>
        <h2 className="ordered-products">Products Ordered</h2>
        <div className="ordered-products-grid">
          <div className="ordered-product-col">PRODUCT</div>
          <div className="ordered-product-price-col">PRICE</div>
          <div className="ordered-product-qty-col">QTY</div>
          <div className="ordered-product-total-col">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
}
export default OrderDetailsComponent;
