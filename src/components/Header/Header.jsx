import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import * as Ai from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productsSlice';
import LoginDivider from '../util/LoginDivider';
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { logout } from '../../features/userSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const [loginToggle, setLoginToggle] = useState(false);

  const [keyword, setKeyword] = useState('');

  const obj = {
    keyword,
    currentPage,
    price,
    category,
    ratings,
  };

  const searchHandler = () => {
    if (keyword.trim()) {
      dispatch(fetchProducts(obj));

      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
  };

  //user logout
  const logoutHandler =  () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleHandler = () => {
    setLoginToggle(!loginToggle);
  };
  return (
    <>
      <nav>
        {/* Mobile navigation  */}

        {window.innerWidth < 919 ? (
          <div className="nav_mobile">
            <div className="top d-flex jusitfy-content-between ">
              <Ai.AiOutlineBars
                className="fs-3 text-dark mt-2"
                onClick={toggleHandler}
              />
              <Typography variant="h5" className="text-center mt-2 flex-grow-1">
                Chocobox
              </Typography>
            </div>
            <div className="--nav_mobile-main">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search"
                  aria-label="search"
                  aria-describedby="addon-wrapping"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <span
                  className="input-group-text"
                  id="addon-wrapping"
                  onClick={() => {
                    searchHandler(keyword);
                  }}
                >
                  <Button>
                    <Ai.AiOutlineSearch />
                  </Button>
                </span>
              </div>
              <div className={loginToggle ? 'slideInDown' : 'nav_list'}>
                <List component="nav" aria-label="login logout">
                  {!isAuthenticated ? (
                    <Link to="/login">
                      <ListItem button divider onClick={toggleHandler}>
                        <ListItemText primary="login" />
                      </ListItem>
                    </Link>
                  ) : (
                    <>
                      <Link to="/">
                        <ListItem button onClick={toggleHandler}>
                          <ListItemText primary="HOME" />
                        </ListItem>
                      </Link>{' '}
                      <Link to="/products">
                        <ListItem button onClick={toggleHandler}>
                          <ListItemText primary="PRODUCTS" />
                        </ListItem>
                      </Link>{' '}
                      <Link to="/contact">
                        <ListItem button onClick={toggleHandler}>
                          <ListItemText primary="CONTACT" />
                        </ListItem>
                      </Link>{' '}
                      {/* <Link to="/about">
                        <ListItem button divider onClick={toggleHandler}>
                          <ListItemText primary="ABOUT" />
                        </ListItem>
                      </Link> */}
                      <Link to="/account">
                        <ListItem button onClick={toggleHandler}>
                          <ListItemAvatar>
                            <Avatar src={user.avatar.url} alt={user.name} />
                          </ListItemAvatar>
                          <ListItemText primary="ACCOUNT" />
                        </ListItem>
                      </Link>
                      {user.role === 'admin' ? (
                        <ListItem button onClick={toggleHandler}>
                          <Link to="/admin/dashboard">
                            <ListItemText primary="DASHBOARD" />
                          </Link>
                        </ListItem>
                      ) : null}
                      <Link to="/cart">
                        <ListItem button onClick={toggleHandler}>
                          <ListItemText primary="CART" />
                        </ListItem>
                      </Link>
                      <Link to="/myOrders">
                        <ListItem button divider onClick={toggleHandler}>
                          <ListItemText primary="ORDERS" />
                        </ListItem>
                      </Link>
                    </>
                  )}

                  <ListItem
                    button
                    onClick={() => {
                      logoutHandler();
                      toggleHandler();
                    }}
                  >
                    <ListItemText primary="LOG OUT" />
                  </ListItem>
                </List>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-fluid nav-desktop d-flex justify-content-between align-items-center">
            <div className="nav_list d-flex justify-content-around align-items-center">
              <Typography variant="h4" id="brand">
                Chocobox
              </Typography>
              <ul className="nav_items d-flex justify-content-around">
                <Link to={'/'}>
                  <li className="nav_item">Home</li>
                </Link>
                <Link to={'/products'}>
                  <li className="nav_item">Products</li>
                </Link>
                <Link to={'/contact'}>
                  <li className="nav_item">Contact</li>
                </Link>
                {/* <Link to={'/about'}>
                  <li className="nav_item">About</li>
                </Link> */}
              </ul>
            </div>
            <div className="search_container d-flex justify-content-center align-items-center">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search"
                  aria-label="search"
                  aria-describedby="addon-wrapping"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <span
                  className="input-group-text"
                  id="addon-wrapping"
                  onClick={() => {
                    searchHandler(keyword);
                  }}
                >
                  <Ai.AiOutlineSearch />
                </span>
              </div>
              <div className="more ms-2 d-flex justify-content-center align-items-center">
                <Avatar src={user.avatar.url} alt={user.name} />
                <LoginDivider
                  toggleHandler={toggleHandler}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  className="slider"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
