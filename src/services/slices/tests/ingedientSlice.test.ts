import ingredientsReducer from '../ingredientsSlice';
import { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 15,
    calories: 100,
    price: 50,
    image: 'test1.jpg',
    image_mobile: 'test1-mobile.jpg',
    image_large: 'test1-large.jpg'
  },
  {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'sauce',
    proteins: 8,
    fat: 3,
    carbohydrates: 12,
    calories: 80,
    price: 40,
    image: 'test2.jpg',
    image_mobile: 'test2-mobile.jpg',
    image_large: 'test2-large.jpg'
  }
];

describe('ingredients reducer', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.items).toEqual([]);
  });
});
