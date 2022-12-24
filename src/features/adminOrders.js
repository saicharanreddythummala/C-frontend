import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from './productsSlice';
import { config } from './adminProductsSlice';

//get all orders --admin
export const getAllOrdersAdmin = createAsyncThunk(
  'adminOrders/getAllOrdersAdmin',
  async () => {
    const data = await axios.get(`${URL}/api/v1/admin/orders`, config);
    return data;
  }
);

// Update Order --admin
export const updateOrderAdmin = createAsyncThunk(
  'adminOrders/updateOrderAdmin',
  async (obj) => {
    const { id, status } = obj;
    const { data } = await axios.put(
      `${URL}/api/v1/admin/order/${id}`,
      { status: status },
      config
    );

    return data;
  }
);

// Delete Order --admin
export const deleteOrderAdmin = createAsyncThunk(
  'admin/deleteOrderAdmin',
  async (id) => {
    const { data } = await axios.delete(
      `${URL}/api/v1/admin/order/${id}`,
      config
    );
    return data;
  }
);

const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState: { orders: {}, deleted: {}, updated: {}, users: {} },
  reducers: {
    resetAdminDeleted(state) {
      state.deleted = {};
    },
    resetAdminUpdated(state) {
      state.updated = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.error = null;
      })
      .addCase(getAllOrdersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrderAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrderAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = action.payload;
      })
      .addCase(deleteOrderAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.updated = action.payload;
      })
      .addCase(updateOrderAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const adminOrdersRootReducer = {
  adminOrdersSlice: adminOrdersSlice.reducer,
};

export const { resetAdminDeleted, resetAdminUpdated } =
  adminOrdersSlice.actions;
