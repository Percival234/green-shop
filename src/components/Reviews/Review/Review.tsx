import { ReviewType } from '@/type/review';

import { Rating } from '@/components/Rating/Rating';

import { SERVER_URL } from '@/constants/SERVER_URL';

import './Review.scss';

type ReviewProps = {
  review: ReviewType;
};

export const Review: React.FC<ReviewProps> = ({ review: { user, rate, text, createdAt } }) => {
  return (
    <div className="reviews-item">
      <div className="reviews-item__top">
        <div className="reviews-item__details">
          <div className="reviews-item__image-container">
            <img
              src={`${SERVER_URL}/static/users/default-user.jpg`}
              alt="user"
              className="reviews-item__image"
            />
          </div>
          <div className="reviews-item__info">
            <div className="reviews-item__author">
              {user?.firstname
                ? `${user?.firstname} ${user?.lastname || ''}`
                : user?._id
                ? `User ${user?._id}`
                : 'Unknown user'}
            </div>
            <Rating rating={rate} />
          </div>
        </div>
        <div className="reviews-item__date">{new Date(createdAt).toLocaleDateString('en-GB')}</div>
      </div>
      <p className="reviews-item__text">{text}</p>
    </div>
  );
};
