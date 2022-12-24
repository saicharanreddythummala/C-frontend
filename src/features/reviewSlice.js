import axios from 'axios';
import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { URL } from './productsSlice';

//new review
export const newReview = createAsyncThunk(
  'review/newReview',
  async (reviewData) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: 'include'
    };

    const { data } = await axios.put(
      `${URL}/api/v1/review`,
      reviewData,
      config
    );
    return data;
  }
);

const newReviewSlice = createSlice({
  name: 'review',
  initialState: {success:{}},
  extraReducers: (builder) => {
    builder
      .addCase(newReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(newReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reviewRootReducer = {
  newReviewSlice: newReviewSlice.reducer,
};
