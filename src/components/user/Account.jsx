import React from 'react';
import { useNavigate } from 'react-router-dom';
import Meta from '../Meta';
import {useSelector} from 'react-redux'
import Loader from '../Loader/Loader';
import './account.scss';
import { Button, Typography } from '@mui/material';

export default function Account() {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <Meta title={`${user.name}`} />
          <div id="account" className="container-fluid d-flex">
            <div className="account_info-1 col-lg-7 d-flex flex-column">
              <table className="tg">
                <tbody>
                  <tr>
                    <td className="tg-zv4m">
                      <Typography variant="h6">Full Name:</Typography>
                    </td>
                    <td className="tg-855q">
                      <Typography>{user.name}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className="tg-zv4m">
                      <Typography variant="h6">Email:</Typography>
                    </td>
                    <td className="tg-855q">
                      <Typography>{user.email}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td className="tg-zv4m">
                      <Typography variant="h6">Joined on:</Typography>
                    </td>
                    <td className="tg-855q">
                      <Typography>
                        {String(user.createdAt).substr(0, 10)}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="d-flex  align-items-end justify-content-evenly flex-grow-1 acc_btns">
                <Button
                  variant="outlined"
                  className="mt-2"
                  onClick={() => navigate('/myOrders')}
                >
                  My Orders
                </Button>
                <Button
                  variant="outlined"
                  className="mt-2"
                  onClick={() => navigate('/password/update')}
                >
                  Change Password
                </Button>
              </div>
            </div>
            <div className="account_info-2 col-lg-5">
              <h2 className="text-center">My Profile</h2>
              <div className="--account-img">
                <img src={user.avatar.url} alt={user.name} />
              </div>
              <div className="edit-btn mt-3">
                <Button
                  variant="contained"
                  className="logins"
                  onClick={() => navigate('/me/update')}
                >
                  Edit profile
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
