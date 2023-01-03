import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Meta from '../Meta';
import CheckOutSteps from './CheckOutSteps';
import './confirmOrder.scss';
import axios from 'axios';
import { URL } from '../../features/productsSlice';

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const { error } = useSelector((state) => state.orders);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  let orderInfo;

  const proceedToPayment = async () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));

    orderInfo = await JSON.parse(sessionStorage.getItem('orderInfo'));

    loadRazorpay();
  };

  //razor pay
  function loadRazorpay() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(
          `${URL}/api/v1/payment/process`,
          {
            amount: orderInfo.totalPrice + '00',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: 'include',
          }
        );

        const { amount, id: order_id, currency } = result.data;

        const {
          data: { key },
        } = await axios.get(`${URL}/api/v1/razorpayKey`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: 'include',
        });

        const options = {
          key,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post(
              `${URL}/api/v1/order/new`,
              {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice: orderInfo.subtotal,
                taxPrice: orderInfo.tax,
                shippingPrice: orderInfo.shippingCharges,
                totalPrice: orderInfo.totalPrice,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: 'include',
              }
            );
            navigate('/paymentSuccess');
            console.log(result.data);
          },
          prefill: {
            name: `${user.name}`,
            email: `${user.email}`,
            contact: '1111111111',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <>
      <Meta title="Confirm order" />
      <CheckOutSteps activeStep={1} />
      <div className="confirm_order_page container-fluid">
        <Typography variant="h5" className="text-center mt-3">
          Confirm order
        </Typography>
        <div className="confirm_order container d-flex p-3 justify-content-around">
          <div className="confirmCartItems col-5">
            <Typography variant="h6" className="mb-5">
              Cart
            </Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    className="mb-5 d-flex justify-content-center"
                    key={item.product}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={3} md={2} className="co_img">
                        <img src={item.image} alt="Product" />
                      </Grid>
                      <Grid item xs={3} md={5} className="text-center">
                        <Link to={`/product/${item.product}`}>
                          <Typography variant="h6">{item.name}</Typography>
                        </Link>{' '}
                      </Grid>
                      <Grid item xs={6} md={5}>
                        {' '}
                        <span>
                          {item.quantity} X ₹{item.price} ={' '}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </Grid>
                    </Grid>
                  </div>
                ))}
            </div>
          </div>
          <div className="orderSummary col-4">
            <Typography variant="h6" className="mb-3">
              Order Summary
            </Typography>
            <div className="confirmshippingArea border-bottom pb-3">
              <Typography variant="body1" className="sub_heads border-bottom">
                Shipping Info
              </Typography>
              <div className="confirmshippingAreaBox pt-2">
                <Typography className="sub_info">{user.name}</Typography>
                <Typography className="sub_info">
                  {shippingInfo.phoneNo}
                </Typography>
                <Typography className="sub_info">{address}</Typography>
              </div>
            </div>
            <div className="mt-3 sub_info">
              <div className="d-flex justify-content-between">
                <p>Subtotal:</p>
                <span>₹ {subtotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <p>Shipping Charges:</p>
                <span>₹ {shippingCharges}</span>
              </div>
              <div className="d-flex justify-content-between">
                <p>GST:</p>
                <span>₹ {tax}</span>
              </div>
              <div className="orderSummaryTotal d-flex justify-content-between">
                <p>
                  <strong>Total:</strong>
                </p>
                <span>
                  <strong>₹ {totalPrice}</strong>
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="logins" onClick={proceedToPayment}>
                pay - ₹{totalPrice}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
