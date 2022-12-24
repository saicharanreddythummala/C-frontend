import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import './editUser.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getUserDetailsAdmin,
  resetUpdatedUser,
  updateUserAdmin,
} from '../../../features/adminUsers';
import Meta from '../../Meta';
import { ToastContainer, toast } from 'react-toastify';

export default function EditUser() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { loading, error, user, updated } = useSelector(
    (state) => state.adminUsers
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  console.log(name, email, role);

  const updateUserHandler = () => {
    const obj = {
      id: params.id,
      userData: {
        name,
        email,
        role,
      },
    };
    dispatch(updateUserAdmin(obj));
  };

  useEffect(() => {
    if (user && user._id !== params.id) {
      dispatch(getUserDetailsAdmin(params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

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

    if (updated.success) {
      toast.info('User Updated Successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/admin/dashboard/users');
      dispatch(resetUpdatedUser());
    }
  }, [dispatch, user, error, updated.success, navigate, params.id]);

  return (
    <>
      <Meta title={'edit user'} />
      <div className="edit_user">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Typography variant="h4" className="text-center mt-2">
              Update User
            </Typography>
            <div className="edit_user-f d-flex justify-content-center">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      fullWidth
                      label="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      fullWidth
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="user_cat">set role</InputLabel>
                    <Select
                      labelId="user_cat"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    className="logins"
                    disabled={
                      loading ? true : false || role === '' ? true : false
                    }
                    onClick={updateUserHandler}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </div>
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
