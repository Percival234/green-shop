import { AiOutlineHistory } from 'react-icons/ai';

import { OrderType } from '@/types/order';

import { Empty } from '@/components/UI/Empty/Empty';
import { Order } from '@/components/Order/Order/Order';

import './OrderList.scss';

type OrderListProps = {
  orders: OrderType[];
};

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (!orders.length) return <Empty text="Order history is empty" Icon={AiOutlineHistory} />;

  return (
    <div className="order-list">
      {orders.map((order) => (
        <Order key={order._id} order={order} />
      ))}
    </div>
  );
};
