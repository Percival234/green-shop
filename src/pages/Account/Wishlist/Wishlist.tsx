import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Title } from '@/components/UI//Title/Title';
import { Button } from '@/components/UI/Button/Button';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingPage } from '@/components/UI/Loading/Loading';
import { ProductList } from '@/components/Product/ProductList/ProductList';

import { useWishlist } from '@/hooks/useWishlist';

import { WishlistService } from '@/api/services/wishlist-service';

import { catchError } from '@/helpers/catchError';

import './Wishlist.scss';

export const Wishlist = () => {
  const queryqueryClient = useQueryClient();
  const { data: wishlist, isPending, error } = useWishlist();

  const { mutate } = useMutation({
    mutationFn: () => WishlistService.clear(),
    onSuccess: (res) => {
      queryqueryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const deleteWishlist = () => mutate(undefined);

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorServer error={error} />;

  return (
    <>
      <Title variant="border" size="medium">
        Wishlist
      </Title>
      <ProductList products={wishlist?.products} />
      <div className="wishlist__button">
        {wishlist?.products?.length > 0 && (
          <Button variant="outline" onClick={deleteWishlist}>
            Remove all
          </Button>
        )}
      </div>
    </>
  );
};
