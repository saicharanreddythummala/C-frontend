import React from 'react';
import {
  ListItem,
  List,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';

export default function LoginDivider({ toggleHandler, isAuthenticated, user, className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const style = {
    width: '100px',
    maxWidth: 360,
    bgcolor: 'background.paper',
    position: 'absolute',
    right: 130,
    minWidth: 'fit-content',
  };

  const logoutHandler = ()=>{
    dispatch(logout());
    navigate('/login');
  }
  return (
    <>
      <List sx={style} component="nav" aria-label="login logout" className={className}>
       
        {!isAuthenticated ? (
          <Link to="/login">
            <ListItem  divider onClick={toggleHandler}>
              <ListItemText primary="login" />
            </ListItem>
          </Link>
        ) : (
          <>
            <Link to="/account">
              <ListItem  divider onClick={toggleHandler}>
                <ListItemAvatar>
                  <Avatar src={user.avatar.url} alt={user.name} />
                </ListItemAvatar>
                <ListItemText primary="my account" />
              </ListItem>
            </Link>
            {user.role === 'admin' ? (
          <Link to="/admin/dashboard">
            <ListItem  divider onClick={toggleHandler}>
              <ListItemText primary="dashboard" />
            </ListItem>
          </Link>
        ) : null}
            <Link to="/cart">
              <ListItem  divider onClick={toggleHandler}>
                <ListItemText primary="my cart" />
              </ListItem>
            </Link>
            <Link to="/myOrders">
              <ListItem  divider onClick={toggleHandler}>
                <ListItemText primary="my Orders" />
              </ListItem>
            </Link>
          </>
        )}

        <Divider />
        <ListItem  onClick={()=>{logoutHandler(); toggleHandler()}}>
          <ListItemText primary="logout" />
        </ListItem>
      </List>
    </>
  );
}
