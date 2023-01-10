import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from './productsSlice';
import { config } from './adminProductsSlice';

//add items
export const addItemsToCart = createAsyncThunk(
  'cart/addItemsToCart',
  async (obj) => {
    const { id, quantity } = obj;
    const result = await axios.get(`${URL}/api/v1/product/${id}`, config);

    let payload = {
      product: result.data.product._id,
      name: result.data.product.name,
      price: result.data.product.price,
      image: result.data.product.images[0].url,
      stock: result.data.product.Stock,
      quantity,
    };

    return payload;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(`${localStorage.getItem('shippingInfo')}`)
      : {
          address: '',
          city: '',
          state: '',
          country: '',
          pinCode: Number,
          phoneNo: Number,
        },
  },
  reducers: {
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
      localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.shippingInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        const item = action.payload;

        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );

        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        state.loading = false;
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const cartRootReducer = {
  cartSlice: cartSlice.reducer,
};

export const { removeItemFromCart, saveShippingInfo, clearCart } =
  cartSlice.actions;
