import React from 'react';
import Loader from '../Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import Meta from '../Meta';
import {
  userProfileReset,
  updateProfile,
} from '../../features/userProfileSlice';
import { Button, TextField, Typography } from '@mui/material';
import './editProfile.scss';
import { Stack } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfile
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('../assets/Profile.png');

  const updateProfileSubmit = () => {
    const obj = {
      name,
      email,
      avatar,
    };

    dispatch(updateProfile(obj));
  };

  const updateProfileHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (isUpdated) {
      toast.info('Profile Updated Successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      dispatch(loadUser());
      dispatch(userProfileReset());
      navigate('/account');
    }
  }, [dispatch, error, user, isUpdated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title="Update Profile" />
          <div
            id="edit_profile"
            className="d-flex justify-content-center align-items-center"
          >
            <div className="ep_card">
              <Typography variant="h4" className="text-center mb-2">
                Update Profile
              </Typography>

              <div className="--ep_card-body d-flex">
                <img src={avatarPreview} alt="Avatar Preview" />
                <div className="stacks d-flex flex-column justify-content-center ms-5 flex-grow-1">
                  <Stack spacing={2}>
                    <label id="file_input_label" htmlFor="avatar">
                      Choose an avatar
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileHandler}
                    />
                    <TextField
                      label="name"
                      value={name}
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      required
                      fullWidth
                    />
                    <TextField
                      label="email"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                    />
                  </Stack>
                </div>
              </div>

              <div className="buttons">
                <Button
                  variant="outlined"
                  onClick={updateProfileSubmit}
                  className="logins mt-3"
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  className="logins mt-3 me-3"
                  onClick={() => navigate('/account')}
                >
                  Cancel
                </Button>
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
