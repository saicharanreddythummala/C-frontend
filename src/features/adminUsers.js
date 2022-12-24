import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from './productsSlice';
import { config } from './adminProductsSlice';


// Delete User --admin
export const deleteUserAdmin = createAsyncThunk(
  'adminUsers/deleteUserAdmin',
  async (id) => {
    const { data } = await axios.delete(
      `${URL}/api/v1/admin/user/${id}`,
      config
    );
    return data;
  }
);

// get  User Details --admin
export const getUserDetailsAdmin = createAsyncThunk(
  'adminUsers/getUserDetailsAdmin',
  async (id) => {
    const { data } = await axios.get(`${URL}/api/v1/admin/user/${id}`, config);

    return data;
  }
);

// Update User --admin
export const updateUserAdmin = createAsyncThunk(
  'adminUsers/updateUserAdmin',
  async (obj) => {
    const { id, userData } = obj;
    const { data } = await axios.put(
      `${URL}/api/v1/admin/user/${id}`,
      userData,
      config
    );
    return data;
  }
);

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState: {user:{}, deleted: {}, updated: {} },
  reducers: {
    resetDeletedUser(state) {
      state.deleted = {};
    },
    resetUpdatedUser(state) {
      state.updated = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetailsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserDetailsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = action.payload;
      })
      .addCase(deleteUserAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.updated = action.payload;
      })
      .addCase(updateUserAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const adminUsersRootReducer = {
  adminUsersSlice: adminUsersSlice.reducer,
};

export const { resetDeletedUser, resetUpdatedUser } = adminUsersSlice.actions;
