import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingLocal } from '@/components/UI/Loading/Loading';
import { ReviewList } from '@/components/Reviews/ReviewList/ReviewList';
import { ReviewForm } from '@/components/Reviews/ReviewForm/ReviewForm';

import { getReviews } from '@/API/API';

import './Reviews.scss';

export const Reviews = () => {
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getReviews(String(id)),
  });

  if (isPending) return <LoadingLocal />;
  if (error) return <ErrorServer error={error} />;

  return (
    <div className="reviews">
      <ReviewList reviews={data} />
      <ReviewForm />
    </div>
  );
};
