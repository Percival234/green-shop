import { CartItemType } from '@/type/cartItem';

import { SERVER_URL } from '@/constants/SERVER_URL';

import './CheckoutItem.scss';

type CheckoutItemProps = {
  item: CartItemType;
};

export const CheckoutItem: React.FC<CheckoutItemProps> = ({ item: { product, count } }) => {
  return (
    <div className="checkout-item">
      <div className="checkout-item__image-container">
        <img
          src={`${SERVER_URL}/static/products/${product.image}`}
          alt={product.name}
          className="checkout-item__image"
        />
      </div>
      <div className="checkout-item__content">
        <h4 className="checkout-item__title">{product.name}</h4>
        <div className="checkout-item__qty">(x{count})</div>
        <div className="checkout-item__price">
          ${(count * (product.price - (product.price / 100) * product.sale)).toFixed(2)}
        </div>
      </div>
    </div>
  );
};
