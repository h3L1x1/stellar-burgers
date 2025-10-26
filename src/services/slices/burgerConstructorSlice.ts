import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TConstructorState = {
  items: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
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
      state.items.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.items.bun = null;
      state.items.ingredients = [];
    }
  }
});

export const { addBun, addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
