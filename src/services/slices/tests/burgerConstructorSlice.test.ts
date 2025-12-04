import burgerConstructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../burgerConstructorSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 100,
  price: 50,
  image: 'test.jpg',
  image_mobile: 'test-mobile.jpg',
  image_large: 'test-large.jpg'
};

const mockBun: TIngredient = {
  ...mockIngredient,
  type: 'bun'
};

describe('burgerConstructor reducer', () => {
  const initialState = {
    items: {
      bun: null,
      ingredients: []
    }
  };

  it('should handle addBun', () => {
    const action = addBun(mockBun);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.items.bun).toEqual(mockBun);
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.items.ingredients).toHaveLength(1);
    expect(state.items.ingredients[0]).toMatchObject(mockIngredient);
    expect(state.items.ingredients[0]).toHaveProperty('id');
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = burgerConstructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );

    const ingredientId = stateWithIngredient.items.ingredients[0].id;
    const action = removeIngredient(ingredientId);
    const state = burgerConstructorReducer(stateWithIngredient, action);

    expect(state.items.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    const ingredient1 = { ...mockIngredient, _id: '1' };
    const ingredient2 = { ...mockIngredient, _id: '2' };
    const ingredient3 = { ...mockIngredient, _id: '3' };

    let state = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient1)
    );
    state = burgerConstructorReducer(state, addIngredient(ingredient2));
    state = burgerConstructorReducer(state, addIngredient(ingredient3));

    const action = moveIngredient({ fromIndex: 0, toIndex: 2 });
    state = burgerConstructorReducer(state, action);

    expect(state.items.ingredients[2]._id).toBe('1');
    expect(state.items.ingredients[0]._id).toBe('2');
  });

  it('should handle clearConstructor', () => {
    const stateWithItems = burgerConstructorReducer(
      burgerConstructorReducer(initialState, addBun(mockBun)),
      addIngredient(mockIngredient)
    );

    const action = clearConstructor();
    const state = burgerConstructorReducer(stateWithItems, action);

    expect(state.items.bun).toBeNull();
    expect(state.items.ingredients).toHaveLength(0);
  });
});
