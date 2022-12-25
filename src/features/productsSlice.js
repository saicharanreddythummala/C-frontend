import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const URL = `https://chocobox-backend.vercel.app/`;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: 'include',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (obj) => {
    const {keyword,currentPage,price,category,ratings} = obj
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    const data = await axios.get(`${URL}${link}`, config);

    return data;
  }
);

export const getProductDetail = createAsyncThunk('product/getProductDetails',async(id)=>{
  const data = await axios.get (`${URL}/api/v1/product/${id}`)
  return data
})

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.data.products;
      state.productCount = action.payload.data.productCount;
      state.productsPerPage = action.payload.data.productsPerPage;
      state.filteredProductsCount = action.payload.data.filteredProductsCount;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
   

  },
});

const productSlice = createSlice({
  name: 'product',
  initialState: {product: {}},
  extraReducers: builder=>{
     builder.addCase(getProductDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.data.product;
    });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.loading = false;
      state.product = {};
      state.error = action.error.message;
    });
  }
})


export const productRootReducer = {
  productsSlice: productsSlice.reducer,
  productSlice: productSlice.reducer
}


