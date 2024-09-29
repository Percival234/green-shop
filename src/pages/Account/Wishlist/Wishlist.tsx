import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Title } from '@/components/UI//Title/Title';
import { Button } from '@/components/UI/Button/Button';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingPage } from '@/components/UI/Loading/Loading';
import { ProductList } from '@/components/Product/ProductList/ProductList';

import { useWishlist } from '@/hooks/useWishlist';

import { clearWishlist } from '@/API/API';

import './Wishlist.scss';

export const Wishlist = () => {
  const queryClient = useQueryClient();
  const { data: wishlist, isPending, error } = useWishlist();

  const { mutate } = useMutation({
    mutationFn: () => clearWishlist(),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
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
        {!!wishlist.products?.length && (
          <Button variant="outline" onClick={deleteWishlist}>
            Remove all
          </Button>
        )}
      </div>
    </>
  );
};
