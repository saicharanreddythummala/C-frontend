import React from 'react';
import { TextField, Button, Typography, Input } from '@mui/material';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../features/userSlice';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
import './loginSignUp.scss';
import lg_img from '../../assets/logImg.jpg';
import rgstr_img from '../../assets/signUpImg.jpg';
import avatarImg from '../../assets/avatarImg.png';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginSignUp() {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [form, setForm] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(avatarImg);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  const handleLoginSubmit = () => {
    const obj = {
      email: loginEmail,
      password: loginPassword,
    };
    dispatch(login(obj));
  };

  const registerHandler = () => {
    const formData = {
      name,
      email,
      password,
      avatar,
    };

    dispatch(register(formData));
  };

  const registerChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const searchParams = useSearchParams();

  const redirect = searchParams[0].get('redirect')
    ? `/${searchParams[0].get('redirect')}`
    : '/account';

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
        theme: 'dark',
      });
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {form ? (
            <>
              <div className="container-fluid d-flex" id="login">
                <div
                  id="log_form"
                  className="col d-flex flex-column justify-content-center align-items-center"
                >
                  <div className="card w-50 border-0  flex-grow-1">
                    <div className="card-body d-flex flex-column justify-content-center">
                      <div className="card-title">
                        <h1 className="text-center">Welcome back</h1>
                      </div>
                      <p className="card-subititle text-center">
                        Please enter your details
                      </p>
                      <div className="d-flex flex-column">
                        <TextField
                          id="email"
                          label="Email"
                          variant="standard"
                          className="mb-5"
                          size="small"
                          onChange={(e) => {
                            setLoginEmail(e.target.value);
                          }}
                        />
                        <TextField
                          id="password"
                          label="Password"
                          variant="standard"
                          className="mb-5"
                          size="small"
                          type="password"
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                          }}
                        />
                        <div id="frgt_pwd" className="text-end m-2">
                          <Typography>
                            <Link to="/password/forgot">Forgot password?</Link>
                          </Typography>
                        </div>
                        <Button
                          variant="contained"
                          onClick={() => {
                            handleLoginSubmit();
                          }}
                          className="logins"
                        >
                          Sign in
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div id="log_bottom" className=" m-4">
                    <Typography variant="subtitle-text">
                      Not a member?
                      <span onClick={() => setForm(!form)} id="--sign_up">
                        {' '}
                        Sign up
                      </span>
                    </Typography>
                  </div>
                </div>
                {window.innerWidth < 1280 ? null : (
                  <div className="log__img col">
                    <img src={lg_img} alt="people eating chocolate" />
                  </div>
                )}
              </div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </>
          ) : (
            <>
              <div id="signUp" className="container-fluid p-0">
                <div className="rgstr d-flex">
                  {window.innerWidth < 1200 ? null : (
                    <div className="rgstr_img col">
                      <img src={rgstr_img} alt="hot chocolate" />
                    </div>
                  )}
                  <div className="card col col-lg col-md d-flex align-items-center border-0">
                    <div className="card-body d-flex flex-column  align-self-center justify-content-center">
                      <h1 className="card-title text-center">
                        Register account
                      </h1>
                      <TextField
                        label="Name"
                        variant="standard"
                        className="mb-5"
                        size="small"
                        name="name"
                        onChange={registerChange}
                      />
                      <TextField
                        label="Email"
                        variant="standard"
                        className="mb-5"
                        size="small"
                        name="email"
                        onChange={registerChange}
                      />
                      <TextField
                        label="Password"
                        type="password"
                        variant="standard"
                        className="mb-5"
                        size="small"
                        name="password"
                        onChange={registerChange}
                      />

                      <div className="d-flex justify-content-between mb-2">
                        <div id="--rgstr_img-prev" className="">
                          <img src={avatarPreview} alt="Avatar Preview" />
                        </div>
                        <div className="d-flex align-items-center">
                          <label htmlFor="file_input" id="file_input_label">
                            Upload Avatar
                            <Input
                              type="file"
                              title="Choose file"
                              name="avatar"
                              accept="image/*"
                              id="file_input"
                              onChange={registerChange}
                            />
                          </label>
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        className="logins"
                        onClick={registerHandler}
                      >
                        Create account
                      </Button>
                      <div className="m-2">
                        <Button
                          color="secondary"
                          onClick={() => setForm(!form)}
                          fullWidth
                        >
                          Back to login
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
