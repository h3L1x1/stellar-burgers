import store, { rootReducer } from '../../store';
import ingredientsSlice from '../../slices/ingredientsSlice';
import orderSlice from '../../slices/orderSlice';
import feedSlice from '../../slices/feedSlice';
import burgerConstructorSlice from '../../slices/burgerConstructorSlice';
import authSlice from '../../slices/authSlice';
import userOrdersSlice from '../../slices/userOrderSlice';

describe('rootReducer', () => {
  const initAction = { type: '@@INIT' };

  it('should be defined', () => {
    expect(rootReducer).toBeDefined();
  });

  it('rootReducer должен возвращать корректное начальное состояние', () => {
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      ingredients: ingredientsSlice(undefined, initAction),
      order: orderSlice(undefined, initAction),
      feed: feedSlice(undefined, initAction),
      burgerConstructor: burgerConstructorSlice(undefined, initAction),
      auth: authSlice(undefined, initAction),
      userOrders: userOrdersSlice(undefined, initAction)
    });
  });

  it('rootReducer должен возвращать то же состояние при неизвестном экшене', () => {
    const prevState = store.getState();
    const state = rootReducer(prevState, { type: 'UNKNOWN_ACTION' });
    expect(state).toBe(prevState);
  });
});
