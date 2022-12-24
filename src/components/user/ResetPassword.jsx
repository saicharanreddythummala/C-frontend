import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../features/passwordSlice';
import Loader from '../Loader/Loader';
import Meta from '../Meta';
import './resetPassword.scss';
import Arrow from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { error, success, loading } = useSelector((state) => state.pwd);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = () => {
    const obj = {
      token: params.token,
      passwords: {
        password,
        confirmPassword,
      },
    };

    dispatch(resetPassword(obj));
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

    if (success) {
      alert('Password Updated Successfully');

      navigate('/login');
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title="Reset password" />
          <div
            id=""
            className="rst_pwd d-flex flex-column justify-content-center align-items-center"
          >
            <div className="rst_card">
              <Typography variant="h5" className="text-center">
                Set new password
              </Typography>
              <Stack spacing={2} className="mt-2">
                <div>
                  <TextField
                    type="password"
                    label="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    label="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    fullWidth
                  />
                </div>
                <Button
                  className="logins"
                  variant="outlined"
                  onClick={resetPasswordSubmit}
                >
                  Reset password
                </Button>
                <Button
                  startIcon={<Arrow />}
                  color="secondary"
                  onClick={() => navigate('/login')}
                >
                  Back to login
                </Button>
              </Stack>
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
