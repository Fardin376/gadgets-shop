'use client';

import moment from 'moment';
import Heading from '../Heading';
import { Rating } from '@mui/material';
import Avatar from '../Avatar';

function ListRating({ product }: { product: any }) {
  if (product.reviews.length === 0) {
    return null;
  }

  return (
    <div>
      <Heading title="Product Reviews" />
      <div className="list-rating-wrapper">
        {product.reviews.map((review: any) => (
          <div className="list-rating-content" key={review.id}>
            <div className="list-rating-content-user">
              <Avatar src={review.user.image} />
              <div className="font-semibold text-medium">
                {review?.user.name}
              </div>
              <div className="list-rating-content-date font-light">
                {moment(review.createdDate).fromNow()}
              </div>
            </div>
            <div className="list-rating-content-rating">
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                size="medium"
                sx={{ color: '#FFBB00' }}
              />
              <p className="list-rating-content-comment">{review.comment}</p>
            </div>
            <hr className="horizontal-line-product-review" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ListRating;
