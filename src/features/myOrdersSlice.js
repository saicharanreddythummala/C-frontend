import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from './productsSlice';

// My Orders
export const myOrders = createAsyncThunk('myOrders/myOrders', async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: 'include',
  };

  const { data } = await axios.get(`${URL}/api/v1/orders/me`, config);

  return data;
});

const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState: { allOrders: [] },
  extraReducers: (builder) => {
    builder
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const myOrdersRootReducer = {
  myOrdersSlice: myOrdersSlice.reducer,
};
