import { Title } from '@/components/UI/Title/Title';
import { CartList } from '@/components/Cart/CartList/CartList';

import { useCartStore } from '@/store/cartStore';

import './CartProducts.scss';

export const CartProducts = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className="cart-list">
      <Title variant="border" size="medium">
        Cart
      </Title>
      <CartList products={cartItems} />
    </div>
  );
};
