import orderReducer, {
  createOrder,
  fetchOrderByNumber,
  clearOrder
} from '../orderSlice';
import { TOrder } from '../../../utils/types';

const mockOrder: TOrder = {
  _id: '1',
  ingredients: ['ingredient1', 'ingredient2'],
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345
};

describe('order reducer', () => {
  const initialState = {
    orderData: null,
    loading: false,
    error: null
  };

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('should handle createOrder.rejected', () => {
    const errorMessage = 'Order creation failed';
    const action = {
      type: createOrder.rejected.type,
      payload: errorMessage
    };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orderData).toBeNull();
  });

  it('should handle fetchOrderByNumber lifecycle', () => {
    // pending
    let state = orderReducer(initialState, {
      type: fetchOrderByNumber.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();

    state = orderReducer(initialState, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    });
    expect(state.loading).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
    expect(state.error).toBeNull();

    state = orderReducer(initialState, {
      type: fetchOrderByNumber.rejected.type,
      payload: 'Order not found'
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Order not found');
    expect(state.orderData).toBeNull();
  });

  it('should handle clearOrder', () => {
    const stateWithOrder = {
      orderData: mockOrder,
      loading: false,
      error: 'Some error'
    };

    const action = clearOrder();
    const state = orderReducer(stateWithOrder, action);

    expect(state.orderData).toBeNull();
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });
});
