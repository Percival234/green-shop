import { CartItemType } from '@/type/cartItem';

import { CartItem } from '@/components/Cart/CartItem/CartItem';

import './CartList.scss';

type CartListProps = {
  products: CartItemType[];
};

export const CartList: React.FC<CartListProps> = ({ products }) => {
  return (
    <div className="cart-list__list">
      {products.map((item) => (
        <CartItem item={item} key={item.product._id} />
      ))}
    </div>
  );
};
