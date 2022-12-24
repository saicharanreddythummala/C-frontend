import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from './productsSlice';




//update user
export const updateProfile = createAsyncThunk(
    'userProfile/updateProfile',
    async (userData) => {
      const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials:'include' };
      // console.log(userData)
      const  data  = await axios.put(`${URL}/api/v1/me/update`, userData, config);
  
      return data; 
    }
  );
  
  //update Password
  export const updatePassword = createAsyncThunk('userProfile/updatePassword', async(passwords)=>{
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: 'include' };
  
    console.log(passwords)
      const { data } = await axios.put(
        `${URL}/api/v1/password/update`,
        passwords,
        config
      );
      
      return data;
  });


const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {userProfile: {}},
    reducers: {
      userProfileReset(state, action){
        state.loading = false;
        state.isUpdated = false;
      },
      userPasswordReset(state){
        state.loading = false;
        state.isUpdated = false;
      }
    },
    extraReducers: builder=>{
     builder
     .addMatcher(isAnyOf(updateProfile.pending, updatePassword.pending), (state)=>{
      state.loading = true
     })
     .addMatcher(isAnyOf(updateProfile.fulfilled, updatePassword.fulfilled),(state,action)=>{
      state.loading = false;
      state.isUpdated = action.payload
     })
     .addMatcher(isAnyOf(updateProfile.rejected, updateProfile.rejected),(state,action)=>{
      state.loading = false;
      state.error = action.error.message
     })
    }
  })

export const userProfileRootReducer = {
  userProfileSlice: userProfileSlice.reducer
}

export const {userProfileReset, userPasswordReset} = userProfileSlice.actions;
