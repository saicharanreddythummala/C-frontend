import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { URL } from '../../../features/productsSlice';

export default function Payment() {
  const [loading, setLoading] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.orders);

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  console.log(order);

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
            alert(result.data.msg);
          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '111111',
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
      <div className="App">
        <h1> Razorpay Example: Node & React</h1>
        <hr />
        <div>
          <h2> Pay Order</h2>
          <label>
            Amount:{' '}
            <input
              placeholder="INR"
              type="number"
              value={orderInfo.totalPrice}
              readOnly
            ></input>
          </label>

          <button disabled={loading} onClick={loadRazorpay}>
            Razorpay
          </button>
          {loading && <div>Loading...</div>}
        </div>
      </div>
    </>
  );
}
