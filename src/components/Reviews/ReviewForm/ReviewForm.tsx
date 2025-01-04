import { toast } from 'react-toastify';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateReviewType } from '@/types/review';

import { Button } from '@/components/UI/Button/Button';
import { ErrorForm } from '@/components/UI/Error/Error';
import { TextArea } from '@/components/UI/TextArea/TextArea';
import { LoadingButton } from '@/components/UI/Loading/Loading';

import { ReviewService } from '@/api/services/review-service';

import { useRequiredAuth } from '@/hooks/useRequiredAuth';

import { catchError } from '@/helpers/catchError';

import './ReviewForm.scss';

type ReviewFormProps = {
  productId: string;
  rate: number;
  text: string;
};

export const ReviewForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const authCheck = useRequiredAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<ReviewFormProps>();

  const { mutate, isPending } = useMutation({
    mutationFn: (review: CreateReviewType) => ReviewService.create(review),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      reset();
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const submitReview: SubmitHandler<ReviewFormProps> = ({ rate, text }) => {
    const review = {
      productId: String(id),
      rate: rate,
      text: text,
    };
    mutate(review);
  };

  return (
    <form
      id="review-form"
      onSubmit={handleSubmit(authCheck(submitReview))}
      className="reviews-form">
      <TextArea
        register={{
          ...register('text', {
            required: 'Review text is required',
            maxLength: 500,
          }),
        }}
        placeholder="Create review"
      />
      <div className="reviews-form__actions">
        <div className="rating-form">
          <input
            type="radio"
            className="rating-form__input"
            id="rating-star-5"
            {...register('rate', {
              required: 'Rating is required',
            })}
            value={5}
          />
          <label className="rating-form__label" htmlFor="rating-star-5">
            <AiFillStar size={50} />
          </label>
          <input
            type="radio"
            className="rating-form__input"
            id="rating-star-4"
            {...register('rate')}
            value={4}
          />
          <label className="rating-form__label" htmlFor="rating-star-4">
            <AiFillStar size={50} />
          </label>
          <input
            type="radio"
            className="rating-form__input"
            id="rating-star-3"
            {...register('rate')}
            value={3}
          />
          <label className="rating-form__label" htmlFor="rating-star-3">
            <AiFillStar size={50} />
          </label>
          <input
            type="radio"
            className="rating-form__input"
            id="rating-star-2"
            {...register('rate')}
            value={2}
          />
          <label className="rating-form__label" htmlFor="rating-star-2">
            <AiFillStar size={50} />
          </label>
          <input
            type="radio"
            className="rating-form__input"
            id="rating-star-1"
            {...register('rate')}
            value={1}
          />
          <label className="rating-form__label" htmlFor="rating-star-1">
            <AiFillStar size={50} />
          </label>
        </div>
        <div className="rating-form__rate">{watch('rate') || 0}</div>
        <ErrorForm error={errors?.rate?.message || errors?.text?.message} />
        <Button disabled={isPending} type="submit">
          {isPending ? <LoadingButton /> : 'Send Review'}
        </Button>
      </div>
    </form>
  );
};
