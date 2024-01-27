'use client';

import { truncateText } from '@/utils/truncateText';
import { formatPrice } from '@/utils/utils';
import { CartProductType } from '@prisma/client';
import Image from 'next/image';

function OrderItem({ item }: { item: CartProductType }) {
  return (
    <div className="order-item-grid">
      <div className="order-item-product-col">
        <div className="order-item-img">
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            fill
            objectFit="contain"
          />
        </div>
        <div className="order-item-product-name-wrapper">
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className="order-item-price-col">{formatPrice(item.price)}</div>
      <div className="order-item-price-col">{item.quantity}</div>
      <div className="order-item-total-col">
        {formatPrice(item.quantity * item.price)}
      </div>
    </div>
  );
}
export default OrderItem;
