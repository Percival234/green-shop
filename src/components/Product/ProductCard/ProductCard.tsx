import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiOutlineHeart, AiFillHeart, AiOutlineSearch, AiFillStar } from 'react-icons/ai';

import { ProductType } from '@/type/product';

import { Link } from '@/components/UI/Link/Link';
import { Price } from '@/components/Price/Price';
import { Button } from '@/components/UI/Button/Button';
import { TextTruncated } from '@/components/UI/TextTruncated/TextTruncated';

import { SERVER_URL } from '@/constants/SERVER_URL';

import { useUserStore } from '@/store/userStore';
import { useCartStore } from '@/store/cartStore';

import { updateWishlist } from '@/API/API';

import { useRequiredAuth } from '@/hooks/useRequiredAuth';

import './ProductCard.scss';

type ProductCardProps = {
  product: ProductType;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { _id, name, image, size, price, sale, description, rating, quantity } = product;

  const client = useQueryClient();
  const wishlist = useUserStore((state) => state.wishlist);
  const { cartItems, addToCart, removeFromCart } = useCartStore((state) => state);
  const authCheck = useRequiredAuth();

  const inCart = cartItems.some((item) => item.product._id === _id);
  const inWishlist = wishlist.some((product) => product._id === _id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`Added to cart: ${name} x1`);
  };

  const handleRemoveFromCart = () => removeFromCart(_id);

  const { mutate } = useMutation({
    mutationFn: (id: string) => updateWishlist(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['wishlist'] });
      if (!inWishlist) {
        toast.success('Added to wishlist!');
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const update = () => mutate(_id);

  return (
    <div className={quantity ? 'card' : 'card disactive'}>
      <div className="card__image-container">
        {!!sale && <div className="card__detail card__detail_sale">{sale}%OFF</div>}
        <div className="card__detail card__detail_size">{size.size}</div>
        <img alt={name} src={`${SERVER_URL}/static/products/${image}`} className="card__image" />
        <div className="card__navigation">
          {inWishlist ? (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Remove from wishlist"
              onClick={authCheck(update)}>
              <AiFillHeart />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Add to wishlist"
              onClick={authCheck(update)}>
              <AiOutlineHeart />
            </Button>
          )}
          <Link
            variant="ghost"
            size="icon"
            to={`/product/${_id}`}
            aria-label={`Navigate product page ${name}`}>
            <AiOutlineSearch />
          </Link>
        </div>
      </div>
      <div className="card__content">
        <div className="card__info">
          <Price price={price} sale={sale} />
          <div className="card__rating">
            {rating.toFixed(1)}
            <AiFillStar size={18} />
          </div>
        </div>
        <Link to={`/product/${_id}`} className="card__title">
          {name}
        </Link>
        <TextTruncated rows={2}>{description}</TextTruncated>
        {inCart ? (
          <Button variant="outline" onClick={handleRemoveFromCart}>
            Remove from cart
          </Button>
        ) : (
          <Button onClick={handleAddToCart}>Add to cart</Button>
        )}
      </div>
    </div>
  );
};
