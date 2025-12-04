import feedReducer, { fetchFeed } from '../feedSlice';
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

describe('feed reducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null,
    total: 0,
    totalToday: 0
  };

  it('should handle fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeed.fulfilled', () => {
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10
      }
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeed.rejected', () => {
    const errorMessage = 'Failed to fetch feed';
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: errorMessage }
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toEqual([]);
  });
});
