import { useQuery } from '@tanstack/react-query';

import { Title } from '@/components/UI/Title/Title';
import { ErrorServer } from '@/components/UI/Error/Error';
import { LoadingPage } from '@/components/UI/Loading/Loading';
import { OrderList } from '@/components/Order/OrderList/OrderList';

import { OrderService } from '@/api/services/order-service';

export const Orders = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['order'],
    queryFn: OrderService.getUserOrders,
  });

  if (isPending) return <LoadingPage />;
  if (error) return <ErrorServer error={error} />;

  return (
    <>
      <Title variant="border" size="medium">
        Last orders
      </Title>
      <OrderList orders={data} />
    </>
  );
};
