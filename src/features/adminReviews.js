import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from './productsSlice';
import { config } from './adminProductsSlice';

// Get All Reviews of a Product
export const getAllReviewsAdmin = createAsyncThunk(
  'adminReviews/getAllReviewsAdmin',
  async (id) => {
    const { data } = await axios.get(`${URL}/api/v1/reviews?id=${id}`);
    return data;
  }
);

// Delete Review of a Product
export const deleteReviewsAdmin = createAsyncThunk(
  'adminReviews/deleteReviewsAdmin',
  async (obj) => {
    const { reviewId, productId } = obj;
    const { data } = await axios.delete(
      `${URL}/api/v1/reviews?id=${reviewId}&productId=${productId}`, config
    );

    return data;
  }
);

const adminReviewsSlice = createSlice({
  name: 'adminReviews',
  initialState: { reviews: {}, deleted: {} },
  reducers: {
    resetDeleteReview(state) {
      state.deleted = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviewsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviewsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviewsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReviewsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReviewsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = action.payload;
      })
      .addCase(deleteReviewsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const adminReviewsRootReducer = {
  adminReviewsSlice: adminReviewsSlice.reducer,
};

export const { resetDeleteReview } = adminReviewsSlice.actions;
