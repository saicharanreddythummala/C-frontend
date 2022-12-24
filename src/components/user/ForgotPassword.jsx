import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../features/passwordSlice';
import Loader from '../Loader/Loader';
import Meta from '../Meta';
import './forgotPassword.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loading } = useSelector((state) => state.pwd);

  const [email, setEmail] = useState('');

  const forgotPasswordSubmit = () => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.info(error, {
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

    if (message) {
      toast.info(message, {
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
  }, [dispatch, error, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title="forgot password" />
          <div id="forgot_password">
            <div className="card-ele">
              <Typography variant="h5" className="text-center">
                Forgot Password?
              </Typography>
              <Typography variant="body2" className="text-center">
                No worries. We'll send you instructions
              </Typography>

              <div className="mt-3">
                <div className="d-block m-2">
                  <TextField
                    label="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="d-block m-2">
                  <Button
                    variant="contained"
                    className="logins"
                    onClick={forgotPasswordSubmit}
                    fullWidth
                  >
                    Send
                  </Button>
                </div>
                <div className="m-2">
                  <Button
                    color="secondary"
                    onClick={() => navigate('/login')}
                    fullWidth
                  >
                    Back to login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
    </>
  );
}
