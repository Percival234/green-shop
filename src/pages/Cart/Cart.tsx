import { FiShoppingCart } from 'react-icons/fi';

import { Empty } from '@/components/UI/Empty/Empty';
import { CartTotal } from '@/components/Cart/CartTotal/CartTotal';
import { CartProducts } from '@/components/Cart/CartProducts/CartProducts';

import { useCartStore } from '@/store/cartStore';

import './Cart.scss';

export const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  if (!cartItems.length) return <Empty text="Shopping cart is empty!" Icon={FiShoppingCart} />;

  return (
    <div className="cart">
      <div className="cart__container">
        <CartProducts />
        <CartTotal />
      </div>
    </div>
  );
};
