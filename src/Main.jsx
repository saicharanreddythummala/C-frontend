import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './components/Product/ProductDetail';
import Products from './components/Product/Products';
import Account from './components/user/Account';
import Dashboard from './components/admin/Dashboard/Dashboard';
import { ProtectedRoute } from './components/Route/ProtectedRoute';
import EditProfile from './components/user/EditProfile';
import ChangePassword from './components/user/ChangePassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
// import Payment from './components/Cart/Payment';
import PaymentSuccess from './components/Cart/PaymentSuccess';
import MyOrders from './components/Orders/MyOrders';
import OrderDetails from './components/Orders/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import './main.scss';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import { ToastContainer, toast } from 'react-toastify';
import { loadUser } from './features/userSlice';
import Loader from './components/Loader/Loader';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { URL } from './features/productsSlice';
import Payment from './components/Cart/razorPay/Payment';

export default function Main() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      toast.info('Login to access', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div id="main" className="d-flex flex-column">
          <Header />
          <div id="wrapper" className="d-flex flex-column flex-grow-1">
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/me/update"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/password/update"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />

              <Route path="/process/payment" element={<Payment />} />

              <Route
                path="/paymentSuccess"
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myOrders"
                element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderDetails/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />

              {/* admin routes */}
              <Route
                path="/admin/dashboard/*"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </>
  );
}
