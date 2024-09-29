import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { CartItemType } from '@/types/cartItem';

import { Link } from '@/components/UI/Link/Link';
import { Button } from '@/components/UI/Button/Button';

import { useCartStore } from '@/store/cartStore';

import { SERVER_URL } from '@/constants/SERVER_URL';

import './CartItem.scss';

type CartItemProps = {
  item: CartItemType;
};

export const CartItem: React.FC<CartItemProps> = ({ item: { product, count } }) => {
  const { removeFromCart, increaseItemCount, decreaseItemCount } = useCartStore((state) => state);

  const handleIncreaseItemQuantity = () => increaseItemCount(product._id);
  const handleDecreaseItemQuantity = () => decreaseItemCount(product._id);

  const handleRemoveFromCart = () => removeFromCart(product._id);

  return (
    <div className="cart-item">
      <div className="cart-item__image-container">
        <img
          src={`${SERVER_URL}/static/products/${product.image}`}
          alt={product.name}
          className="cart-item__image"
        />
      </div>
      <div className="cart-item__content">
        <div className="cart-item__left">
          <Link className="cart-item__name" to={`/product/${product._id}`}>
            {product.name}
          </Link>
          <div className="cart-item__price cart-item__price_simple">
            ${(product.price - (product.price / 100) * product.sale).toFixed(2)}
          </div>
          <div className="cart-item__counter">
            <Button
              variant="rounded"
              size="icon"
              aria-label="Decrease count"
              disabled={count <= 1}
              onClick={handleDecreaseItemQuantity}>
              <AiOutlineMinus size={25} />
            </Button>
            <div className="cart-item__count">{count}</div>
            <Button
              variant="rounded"
              size="icon"
              aria-label="Increase count"
              disabled={count >= product.quantity}
              onClick={handleIncreaseItemQuantity}>
              <AiOutlinePlus size={25} />
            </Button>
          </div>
        </div>
        <div className="cart-item__right">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveFromCart}
            aria-label="Remove from cart">
            <AiOutlineDelete size={25} />
          </Button>
          <div className="cart-item__price cart-item__price_total">
            ${(count * (product.price - (product.price / 100) * product.sale)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
