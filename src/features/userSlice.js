import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from './productsSlice';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

//user login
export const login = createAsyncThunk('user/login', async (obj) => {
  const { email, password } = obj;
  
  const data = await axios.post(
    `${URL}/api/v1/login`,
    { email, password },
    config
  );

  return data;
});

//user register
export const register = createAsyncThunk('user/register', async (obj) => {
  const data = await axios.post(`${URL}/api/v1/register`, obj, config);
  return data;
});

//load user
export const loadUser = createAsyncThunk('user/loadUser', async () => {

  const data = await axios.get(`${URL}/api/v1/me`, config);
  return data;
  
});

//user logout
export const logout = createAsyncThunk('user/logout', async () => {
  const data = await axios.get(`${URL}/api/v1/logout`, config);
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      avatar: '',
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = {};
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.error = action.error;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error;
      });
  },
});

export const userRootReducer = {
  userSlice: userSlice.reducer,
};
