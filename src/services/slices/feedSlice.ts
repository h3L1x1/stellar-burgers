// services/slices/feedSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export const fetchFeed = createAsyncThunk('feed/fetchAll', async () => {
  const data = await getFeedsApi();
  return data;
});

type TFeedState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  loading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    updateOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<TOrder>) => {
      // Добавляем новый заказ в начало списка
      state.orders.unshift(action.payload);
      state.total += 1;
      state.totalToday += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      });
  }
});

export const { updateOrders, addOrder } = feedSlice.actions;
export default feedSlice.reducer;
