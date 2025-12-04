import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsSlice from './slices/ingredientsSlice';
import orderSlice from './slices/orderSlice';
import feedSlice from './slices/feedSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import authSLice from './slices/authSlice';
import userOrdersSlice from './slices/userOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  order: orderSlice,
  feed: feedSlice,
  burgerConstructor: burgerConstructorSlice,
  auth: authSLice,
  userOrders: userOrdersSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
