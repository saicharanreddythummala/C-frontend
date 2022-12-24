import axios from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { URL } from './productsSlice';


//forgot password
export const forgotPassword = createAsyncThunk('password/forgotPassword',async(email)=>{
    const config = { headers: { "Content-Type": "application/json" } };
  
    const data  = await axios.post(`${URL}/api/v1/password/forgot`, email, config);
  
    return data
  });

//Reset password
export const resetPassword = createAsyncThunk('password/resetPassword', async(obj)=>{
    const config = { headers: { "Content-Type": "application/json" } };

    const {token, passwords} = obj
    const data  = await axios.put(
      `${URL}/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    return data;
})


const passwordSlice = createSlice({
    name: 'password',
    initialState: {pwd: {}},
    extraReducers: builder=>{
        builder
        .addCase(forgotPassword.fulfilled,(state, action)=>{
            state.loading = false;
            state.message = action.payload.data.message;
            state.error = null;
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = action.payload.data.success;
        })
        .addMatcher(isAnyOf(forgotPassword.pending, resetPassword.pending), (state)=>{
            state.loading = true;
            state.error = null
        })
        .addMatcher(isAnyOf(forgotPassword.rejected, resetPassword.rejected),(state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }

})


export const passwordRootReducer = {
    passwordSlice: passwordSlice.reducer
}