import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorIngredient = TIngredient & {
  id: string;
};

type TConstructorState = {
  items: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  items: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.items.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredientWithId: TConstructorIngredient = {
        ...action.payload,
        id: uuidv4()
      };
      state.items.ingredients.push(ingredientWithId);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.items.ingredients];
      const [movedItem] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedItem);
      state.items.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.items.bun = null;
      state.items.ingredients = [];
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
