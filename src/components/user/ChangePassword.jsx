import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Meta from '../Meta';
import {
  updatePassword,
  userPasswordReset,
} from '../../features/userProfileSlice';
import { Button, TextField, Typography } from '@mui/material';
import Arrow from '@mui/icons-material/ArrowBack';
import { Stack } from '@mui/system';
import './resetPassword.scss';
import { ToastContainer, toast } from 'react-toastify';


export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfile
  );

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('oldPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (isUpdated) {
      toast.info('Profile Updated Successfully',{
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      navigate('/account');

      dispatch(userPasswordReset());
    }
  }, [dispatch, error, isUpdated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title="Change Password" />
          <div className="rst_pwd d-flex flex-column justify-content-center align-items-center">
            <div className="rst_card">
              <Typography variant="h5" className="text-center">
                Update Password
              </Typography>

              <Stack spacing={2}>
                <div className="">
                  <TextField
                    type="password"
                    label="old password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    fullWidth
                  />
                </div>

                <div className="">
                  <TextField
                    type="password"
                    label="new password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="">
                  <TextField
                    type="password"
                    label="confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                  />
                </div>

                <Button
                  variant="outlined"
                  className="logins"
                  onClick={updatePasswordSubmit}
                >
                  Change password
                </Button>
                <Button
                  startIcon={<Arrow />}
                  color="secondary"
                  onClick={() => navigate('/account')}
                >
                  Back
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
