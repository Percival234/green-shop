import { useState } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineMore } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReviewUserType } from '@/types/review';

import { Button } from '@/components/UI/Button/Button';

import { useUser } from '@/hooks/useUser';

import { ReviewService } from '@/api/services/review-service';

import { catchError } from '@/helpers/catchError';

import './ReviewMenu.scss';

type ReviewMenuProps = {
  id: string;
  user: ReviewUserType;
};

export const ReviewMenu: React.FC<ReviewMenuProps> = ({ id, user }) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const { data: currentUser } = useUser();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => ReviewService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onSettled: () => {
      setMenuVisibility(false);
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const handleReviewMenu = () => setMenuVisibility(!menuVisibility);

  const deleteReview = () => mutate(id);

  return (
    currentUser?._id === user._id && (
      <div className="review-menu">
        <Button variant="ghost" size="icon" onClick={handleReviewMenu}>
          <AiOutlineMore size={20} />
        </Button>
        {menuVisibility && (
          <div className="review-menu__menu">
            <button onClick={deleteReview} className="review-menu__menu-button">
              Видалити
            </button>
          </div>
        )}
      </div>
    )
  );
};
