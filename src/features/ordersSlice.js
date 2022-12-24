import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from './productsSlice';


export const createOrder = createAsyncThunk('orders/createOrder',async(order)=>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: 'include'
      };

      const { data } = await axios.post(`${URL}/api/v1/order/new`, order, config);

      return data;
})



const ordersSlice = createSlice({
    name:'orders',
    initialState: {orders:{}},
    extraReducers: builder=>{
        builder.addCase((createOrder.pending), (state)=>{
            state.loading = true
        })
        .addCase((createOrder.fulfilled),(state,action)=>{
            state.loading = false
            state.orders = action.payload
        })
        .addCase(createOrder.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export const ordersRootReducer = {
    ordersSlice: ordersSlice.reducer
}