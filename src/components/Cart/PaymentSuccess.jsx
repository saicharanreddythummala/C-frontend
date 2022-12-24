import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './paymentSuccess.scss';

export default function PaymentSuccess() {
  return (
    <>
      <div className="pymnt-success flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/myOrders">
          <Typography color="secondary">View Orders</Typography>
        </Link>
      </div>
    </>
  );
}
