import { CartItemType } from '@/types/cartItem';

import { CheckoutItem } from '@/components/Checkout/CheckoutItem/CheckoutItem';

import './CheckoutList.scss';

type CheckoutListProps = {
  products: CartItemType[];
};

export const CheckoutList: React.FC<CheckoutListProps> = ({ products }) => {
  return (
    <div className="checkout-list">
      {products.map((item) => (
        <CheckoutItem key={item.product._id} item={item} />
      ))}
    </div>
  );
};
