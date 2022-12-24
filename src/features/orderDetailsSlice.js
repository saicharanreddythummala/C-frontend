import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from './productsSlice';


// Get Order Details
export const getOrderDetails = createAsyncThunk('orderDetails/getOrderDetails',async (id) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: 'include',
  };
  
    const { data } = await axios.get(`${URL}/api/v1/order/${id}`, config);

    return data;

})


//order Details Slice
const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState:  {order:{}} ,
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const orderDetailsRootReducer = {
    orderDetailsSlice: orderDetailsSlice.reducer
}