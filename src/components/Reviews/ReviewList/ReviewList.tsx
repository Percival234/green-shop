import { FiMessageSquare } from 'react-icons/fi';

import { ReviewType } from '@/type/review';

import { Empty } from '@/components/UI/Empty/Empty';
import { Review } from '@/components/Reviews/Review/Review';

import './ReviewList.scss';

type ReviewListProps = {
  reviews: ReviewType[];
};

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews.length) return <Empty text="No reviews" Icon={FiMessageSquare} />;

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <Review key={review._id} review={review} />
      ))}
    </div>
  );
};
