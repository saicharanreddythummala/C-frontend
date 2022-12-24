import { configureStore } from '@reduxjs/toolkit';
import {
  adminOrdersRootReducer,
} from '../features/adminOrders';
import { adminRootReducer } from '../features/adminProductsSlice';
import { adminReviewsRootReducer } from '../features/adminReviews';
import { adminUsersRootReducer } from '../features/adminUsers';
import { cartRootReducer } from '../features/cartSlice';
import { myOrdersRootReducer } from '../features/myOrdersSlice';
import { orderDetailsRootReducer } from '../features/orderDetailsSlice';
import { ordersRootReducer } from '../features/ordersSlice';
import { passwordRootReducer } from '../features/passwordSlice';
import { productRootReducer } from '../features/productsSlice';
import { reviewRootReducer } from '../features/reviewSlice';
import { userProfileRootReducer } from '../features/userProfileSlice';
import { userRootReducer } from '../features/userSlice';

const store = configureStore({
  reducer: {
    products: productRootReducer.productsSlice,
    product: productRootReducer.productSlice,
    user: userRootReducer.userSlice,
    userProfile: userProfileRootReducer.userProfileSlice,
    pwd: passwordRootReducer.passwordSlice,
    cart: cartRootReducer.cartSlice,
    orders: ordersRootReducer.ordersSlice,
    myOrders: myOrdersRootReducer.myOrdersSlice,
    orderDetails: orderDetailsRootReducer.orderDetailsSlice,
    newReview: reviewRootReducer.newReviewSlice,
    admin: adminRootReducer.adminSlice,
    adminOrders: adminOrdersRootReducer.adminOrdersSlice,
    adminUsers: adminUsersRootReducer.adminUsersSlice,
    adminReviews: adminReviewsRootReducer.adminReviewsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
