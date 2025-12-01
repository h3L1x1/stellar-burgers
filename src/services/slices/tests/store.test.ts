import store, { rootReducer } from '../../store';

describe('rootReducer', () => {
  it('should be defined', () => {
    expect(rootReducer).toBeDefined();
  });

  it('slices test', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      ingredients: expect.any(Object),
      order: expect.any(Object),
      feed: expect.any(Object),
      burgerConstructor: expect.any(Object),
      auth: expect.any(Object),
      userOrders: expect.any(Object)
    });
  });
});
