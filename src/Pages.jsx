import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/user/LoginSignUp';
import ForgotPassword from './components/user/ForgotPassword';
import 'react-toastify/dist/ReactToastify.css';

import Main from './Main';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/userSlice';

export default function Pages() {
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}
