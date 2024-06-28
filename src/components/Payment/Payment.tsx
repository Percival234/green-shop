import { Title } from '@/components/UI/Title/Title';

import { useCartStore } from '@/store/cartStore';

import ImagePayment from '@/assets/images/payment.png';

import { PAYMENT_METHODS } from '@/constants/PAYMENT_METHODS';

import './Payment.scss';

export const Payment = () => {
  const setPayment = useCartStore((state) => state.setPayment);
  const payment = useCartStore((state) => state.payment);

  const handlePayment = (payment: string) => {
    setPayment(payment);
  };
  return (
    <div className="payment">
      <Title variant="border">Payment Method</Title>
      <div className="payment__list">
        <label className={`payment__item ${payment === PAYMENT_METHODS[0] ? 'active' : ''}`}>
          <input
            name="payment"
            type="radio"
            className="payment__input"
            value={PAYMENT_METHODS[0]}
            onChange={() => handlePayment(PAYMENT_METHODS[0])}
            checked={payment === PAYMENT_METHODS[0]}
          />
          Cash on delivery
        </label>
        <label className={`payment__item ${payment === PAYMENT_METHODS[1] ? 'active' : ''}`}>
          <input
            name="payment"
            type="radio"
            className="payment__input"
            value={PAYMENT_METHODS[1]}
            onChange={() => handlePayment(PAYMENT_METHODS[1])}
            checked={payment === PAYMENT_METHODS[1]}
          />
          <img src={ImagePayment} alt="payment-systems" />
        </label>
      </div>
    </div>
  );
};
