import { Link } from '@/components/UI/Link/Link';
import { Title } from '@/components/UI/Title/Title';
import { CartCalculation } from '@/components/Cart/CartCalculation/CartCalculation';

import { BLOG_HOW_TO_BUY_ID } from '@/constants/BLOGS';

import './CartTotal.scss';

export const CartTotal = () => {
  return (
    <div className="cart-total">
      <Title variant="border" size="medium">
        Cart Totals
      </Title>
      <div className="cart-total__result">
        <CartCalculation />
        <Link variant="button" size="button" to="/checkout">
          Proceed to checkout
        </Link>
      </div>
      <div className="cart-total__link">
        <Link to={`/blog/${BLOG_HOW_TO_BUY_ID}`}>Read more about payment</Link>
      </div>
    </div>
  );
};
