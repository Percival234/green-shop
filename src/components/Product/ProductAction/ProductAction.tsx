import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus, AiFillHeart } from 'react-icons/ai';

import { ProductType } from '@/types/product';

import { Button } from '@/components/UI/Button/Button';

import { useCartStore } from '@/store/cartStore';

import { WishlistService } from '@/api/services/wishlist-service';

import { useWishlist } from '@/hooks/useWishlist';
import { useRequiredAuth } from '@/hooks/useRequiredAuth';

import { catchError } from '@/helpers/catchError';

import './ProductAction.scss';

type ProductActionProps = {
  product: ProductType;
};

export const ProductAction: React.FC<ProductActionProps> = ({ product }) => {
  const queryClient = useQueryClient();
  const checkAuth = useRequiredAuth();
  const [counter, setCounter] = useState(1);
  const { data: wishlist } = useWishlist();
  const { cartItems, addToCart, removeFromCart } = useCartStore((state) => state);

  const inCart = cartItems.some((item) => item.product._id === product._id);
  const inWishlist = wishlist ? wishlist.products.some((prod) => prod._id === product._id) : false;

  const increaseCount = () => setCounter(counter + 1);
  const decreaseCount = () => setCounter(counter - 1);

  const handleAddToCart = () => {
    addToCart(product, counter);
    toast.success(`Added to cart: ${product.name} x${counter}`);
  };

  const handleRemoveFromCart = () => removeFromCart(product._id);

  const { mutate } = useMutation({
    mutationFn: (id: string) => WishlistService.update(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      if (!inWishlist) {
        toast.success('Added to wishlist!');
      }
    },
    onError: (error) => {
      toast.error(catchError(error));
    },
  });

  const update = () => mutate(product._id);

  return (
    <div className="product-action">
      <div className="product-action__counter">
        <Button
          variant="rounded"
          size="icon"
          aria-label="Decrease count"
          disabled={counter <= 1}
          onClick={decreaseCount}>
          <AiOutlineMinus />
        </Button>
        <div className="product-action__counter-count">{counter}</div>
        <Button
          variant="rounded"
          size="icon"
          aria-label="Increase count"
          disabled={counter >= product.quantity}
          onClick={increaseCount}>
          <AiOutlinePlus />
        </Button>
      </div>
      <div className="product-action__buttons">
        {inCart ? (
          <Button variant="outline" onClick={handleRemoveFromCart}>
            Remove from cart
          </Button>
        ) : (
          <Button onClick={handleAddToCart}>Add to cart</Button>
        )}
        {inWishlist ? (
          <Button
            size="icon"
            variant="outline"
            onClick={checkAuth(update)}
            aria-label="Remove from wishlist">
            <AiFillHeart size={30} />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="outline"
            onClick={checkAuth(update)}
            aria-label="Add to wishlist">
            <AiOutlineHeart size={30} />
          </Button>
        )}
      </div>
    </div>
  );
};
