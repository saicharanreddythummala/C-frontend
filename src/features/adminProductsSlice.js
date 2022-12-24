import axios from 'axios';
import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { URL } from './productsSlice';

export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: 'include',
};

// Get All Products --admin
export const getAllProductsAdmin = createAsyncThunk(
  'admin/getAllProductsAdmin',
  async () => {
    const { data } = await axios.get(`${URL}/api/v1/admin/products`, config);

    return data;
  }
);

// Get All Orders --admin
export const getAllOrdersAdmin = createAsyncThunk(
  'admin/getAllOrdersAdmin',
  async () => {
    const { data } = await axios.get(`${URL}/api/v1/admin/orders`, config);

    return data;
  }
);

// get All Users --admin
export const getAllUsersAdmin = createAsyncThunk(
  'admin/getAllUsersAdmin',
  async () => {
    const { data } = await axios.get(`${URL}/api/v1/admin/users`, config);

    return data;
  }
);

//delete product --admin
export const deleteProductAdmin = createAsyncThunk(
  'admin/deleteProductAdmin',
  async (id) => {
    const { data } = await axios.delete(
      `${URL}/api/v1/admin/product/${id}`,
      config
    );
    return data;
  }
);

// Create Product --admin
export const createProductAdmin = createAsyncThunk(
  'admin/createProductAdmin',
  async (obj) => {
    const { data } = await axios.post(
      `${URL}/api/v1/admin/product/create`,
      obj,
      config
    );
    return data;
  }
);

//update product admin
export const editProductAdmin = createAsyncThunk('admin/editProductAdmin', async(data)=>{
  const {productId: id, obj} = data
  const result = await axios.put(`${URL}/api/v1/admin/product/${id}`, obj, config);
  return result;
})

const adminSlice = createSlice({
  name: 'admin',
  initialState: { products: {}, orders: {}, users: {}, newProduct: {}, updatedProduct:{} },
  reducers: {
    resetNewProduct(state, action) {
      state.newProduct = {};
    },
    resetUpdatedProduct(state, action) {
      state.updatedProduct = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getAllProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllUsersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteProductAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProductAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.newProduct = action.payload;
      })
      .addCase(createProductAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editProductAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProductAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedProduct = action.payload.data;
      })
      .addCase(editProductAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const adminRootReducer = {
  adminSlice: adminSlice.reducer,
};

export const {resetNewProduct, resetUpdatedProduct} = adminSlice.actions;