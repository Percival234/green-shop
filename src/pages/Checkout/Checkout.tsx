import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CreateOrderType } from '@/types/order';

import { Title } from '@/components/UI/Title/Title';
import { Button } from '@/components/UI/Button/Button';
import { Payment } from '@/components/Payment/Payment';
import { ErrorForm } from '@/components/UI/Error/Error';
import { InputWithLabel } from '@/components/UI/Input/Input';
import { LoadingButton } from '@/components/UI/Loading/Loading';
import { CheckoutList } from '@/components/Checkout/CheckoutList/CheckoutList';
import { CartCalculation } from '@/components/Cart/CartCalculation/CartCalculation';

import { postOrder } from '@/API/API';

import { REGEX_EMAIL } from '@/constants/EMAIL_REGEX';

import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { useEventStore } from '@/store/eventStore';

import './Checkout.scss';

type OrderFormProps = {
  checkoutFirstname: string;
  checkoutLastname: string;
  checkoutEmail: string;
  checkoutPhone: string;
  checkoutAddress: string;
  checkoutCity: string;
};

export const Checkout = () => {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const open = useEventStore((state) => state.open);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<OrderFormProps>();
  const { cartItems, totalPrice, shipping, payment, clearCart } = useCartStore((state) => state);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateOrderType) => postOrder(data),
    onSuccess: (res) => {
      navigate('/');
      clearCart();
      open('checkoutModal');
      toast.success(res.message);
    },
    onError(error) {
      toast.error(error?.response?.data?.message);
    },
  });

  useEffect(() => {
    if (user) {
      setValue('checkoutFirstname', user.firstname);
      setValue('checkoutLastname', user.lastname);
      setValue('checkoutEmail', user.email);
      setValue('checkoutPhone', user.phone);
      setValue('checkoutAddress', user.address);
      setValue('checkoutCity', user.city);
    }
  }, [user, setValue]);

  const submitOrder: SubmitHandler<OrderFormProps> = ({
    checkoutFirstname,
    checkoutLastname,
    checkoutEmail,
    checkoutPhone,
    checkoutAddress,
    checkoutCity,
  }) => {
    const order = {
      userId: user?._id,
      firstname: checkoutFirstname,
      lastname: checkoutLastname,
      email: checkoutEmail,
      phone: checkoutPhone,
      address: checkoutAddress,
      city: checkoutCity,
      totalPrice,
      shipping,
      payment,
      cartItems: cartItems.map((item) => ({ product: item.product._id, count: item.count })),
    };
    mutate(order);
  };

  useEffect(() => {
    if (!cartItems.length) navigate('/');
  }, [cartItems, navigate]);

  return (
    <form onSubmit={handleSubmit(submitOrder)} className="checkout">
      <div className="checkout__form">
        <Title size="small" variant="border">
          Billing Address
        </Title>
        <div className="checkout__columns">
          <div className="checkout__column">
            <InputWithLabel
              register={{
                ...register('checkoutFirstname', {
                  validate: (value) => value.length >= 3 || 'First name is too short',
                  required: 'First name is required',
                }),
              }}
              label="first name"
            />
            <ErrorForm error={errors?.checkoutFirstname?.message} />
            <InputWithLabel
              register={{
                ...register('checkoutLastname', {
                  validate: (value) => value.length >= 3 || 'Last name is too short',
                  required: 'Last name is required',
                }),
              }}
              label="last name"
            />
            <ErrorForm error={errors?.checkoutLastname?.message} />
            <InputWithLabel
              register={{
                ...register('checkoutCity', {
                  validate: (value) => value.length >= 3 || 'City / Town name is too short',
                  required: 'City / town is required',
                }),
              }}
              label="city / town"
            />
            <ErrorForm error={errors?.checkoutCity?.message} />
          </div>
          <div className="checkout__column">
            <InputWithLabel
              register={{
                ...register('checkoutAddress', {
                  validate: (value) => value.length >= 3 || 'Address is too short',
                  required: 'Address is required',
                }),
              }}
              label="street address"
            />
            <ErrorForm error={errors?.checkoutAddress?.message} />
            <InputWithLabel
              register={{
                ...register('checkoutEmail', {
                  pattern: {
                    value: REGEX_EMAIL,
                    message: 'Please enter valid email',
                  },
                  required: 'Email address is required',
                }),
              }}
              label="email"
            />
            <ErrorForm error={errors?.checkoutEmail?.message} />
            <InputWithLabel
              register={{
                ...register('checkoutPhone', {
                  validate: (value) =>
                    (String(value).length >= 10 && String(value).length <= 12) ||
                    'Uncorrect phone number',
                  required: 'Phone nubmer is required',
                }),
              }}
              label="phone number"
              type="number"
            />
            <ErrorForm error={errors?.checkoutPhone?.message} />
          </div>
        </div>
      </div>
      <div className="checkout__order">
        <Title size="small" variant="border">
          Your Order
        </Title>
        <div className="checkout__info">
          <CheckoutList products={cartItems} />
          <CartCalculation />
          <Payment />
          <Button type="submit">{isPending ? <LoadingButton /> : 'Place Order'}</Button>
        </div>
      </div>
    </form>
  );
};
