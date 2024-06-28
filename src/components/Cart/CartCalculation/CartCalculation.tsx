import { useEffect } from 'react';

import { useCartStore } from '@/store/cartStore';

import './CartCalculation.scss';

export const CartCalculation = () => {
  const { totalPrice, shipping, cartItems, setTotalPrice } = useCartStore((state) => state);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (acc, item) =>
          acc + (item.product.price - (item.product.price / 100) * item.product.sale) * item.count,
        0
      )
    );
  }, [cartItems, setTotalPrice]);

  return (
    <div className="cart-calculation">
      <div className="cart-calculation__info">
        <div className="cart-calculation__item">
          Subtotal <div className="cart-calculation__result">${totalPrice.toFixed(2)}</div>
        </div>
        <div className="cart-calculation__item">
          Shipping <div className="cart-calculation__coupon-result">${shipping.toFixed(2)}</div>
        </div>
      </div>
      <div className="cart-calculation__item cart-calculation__total">
        Total
        <div className="cart-calculation__total-result">${(totalPrice + shipping).toFixed(2)}</div>
      </div>
    </div>
  );
};
