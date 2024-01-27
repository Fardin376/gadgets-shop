'use client';

import Image from 'next/image';
import { truncateText } from '@/utils/truncateText';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/utils/utils';

function ProductCard({ data }: { data: any }) {
  const router = useRouter();

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  return (
    <div
      className="product-card-wrapper"
      onClick={() => router.push(`/product/${data.id}`)}
    >
      <div className={`product-card-content`}>
        <div className="product-card-image">
          <Image
            sizes="100%"
            src={data.images[0].image}
            alt={data.name}
            fill
            objectFit="contain"
          />
        </div>
        <div className="product-card-name">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="product-card-price">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
}
export default ProductCard;
