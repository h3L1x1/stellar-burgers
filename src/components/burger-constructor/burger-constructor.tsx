import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';
import { fetchFeed } from '../../services/slices/feedSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state) => state.burgerConstructor.items
  );
  const orderRequest = useSelector((state) => state.order.loading);
  const orderModalData = useSelector((state) => state.order.orderData);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const onOrderClick = async () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item: TIngredient) => item._id),
      constructorItems.bun._id
    ];

    await dispatch(createOrder(ingredients));

    dispatch(fetchFeed());
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const shouldShowModal = orderModalData && location.pathname === '/';

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={shouldShowModal ? orderModalData : null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
