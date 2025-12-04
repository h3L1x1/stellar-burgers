import userOrdersReducer, { fetchUserOrders } from '../userOrderSlice';
import { TOrder } from '../../../utils/types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    name: 'Test Order 1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 12345
  }
];

describe('userOrders reducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  it('should handle fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = userOrdersReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = userOrdersReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.error).toBeNull();
  });

  it('should handle fetchUserOrders.rejected', () => {
    const errorMessage = 'Failed to fetch user orders';
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = userOrdersReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toEqual([]);
  });
});
