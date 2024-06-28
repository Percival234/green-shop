import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Title } from '@/components/UI//Title/Title';
import { Button } from '@/components/UI/Button/Button';
import { ProductList } from '@/components/Product/ProductList/ProductList';

import { useUserStore } from '@/store/userStore';

import { clearWishlist } from '@/API/API';

import './Wishlist.scss';

export const Wishlist = () => {
  const queryClient = useQueryClient();
  const wishlist = useUserStore((state) => state.wishlist);

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

  return (
    <>
      <Title variant="border" size="medium">
        Wishlist
      </Title>
      <ProductList products={wishlist} />
      <div className="wishlist__button">
        {!!wishlist?.length && (
          <Button variant="outline" onClick={deleteWishlist}>
            Remove all
          </Button>
        )}
      </div>
    </>
  );
};
