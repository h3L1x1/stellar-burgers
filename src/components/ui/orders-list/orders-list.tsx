import { FC } from 'react';
import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';
import styles from './orders-list.module.css';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => {
  if (!orderByDate || orderByDate.length === 0) {
    return <div className={styles.empty}>Нет заказов</div>;
  }

  return (
    <div className={styles.orders}>
      {orderByDate.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};
