import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../features/orderDetailsSlice';
import Loader from '../Loader/Loader';
import Meta from '../Meta';
import './orderDetails.scss';
import { ToastContainer, toast } from 'react-toastify';

export default function OrderDetails() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const params = useParams();

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
        theme: 'light',
      });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title="Order details" />
          <div className="orderDetailsPage d-flex flex-column align-items-center pt-4">
            <Typography variant="h5" className="top text-center">
              Order #{order && order._id}
            </Typography>
            <div className="orderDetailsContainer d-flex flex-column  w-75">
              <Typography className="shipping">Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <table>
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{order.user && order.user.name}</td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </td>
                    </tr>
                    <tr>
                      <td>Address:</td>
                      <td>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Typography className="shipping">Payment</Typography>

              <table>
                <tbody>
                  <tr>
                    <td>Status:</td>
                    <td
                      className={
                        order.paymentInfo && order.paymentInfo.status === 'Paid'
                          ? 'greenColor '
                          : 'redColor '
                      }
                    >
                      {' '}
                      {order.paymentInfo && order.paymentInfo.status === 'Paid'
                        ? 'PAID'
                        : 'NOT PAID'}
                    </td>
                  </tr>
                  <tr>
                    <td>Amount:</td>
                    <td>{order.totalPrice && order.totalPrice}</td>
                  </tr>
                </tbody>
              </table>

              <Typography className="shipping">Order Status</Typography>

              <table>
                <tbody>
                  <tr>
                    <td>order status:</td>
                    <td
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === 'succeeded'
                          ? 'greenColor '
                          : 'redColor '
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </td>
                  </tr>
                  <tr>
                    <td>Amount:</td>
                    <td>{order.totalPrice && order.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="orderDetailsCartItems w-75">
              <Typography className="shipping">Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                <table>
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <tr key={item.product}>
                        <td>
                          <img id="ord_img" src={item.image} alt="Product" />
                        </td>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <Link to={`/product/${item.product}`}>
                                    <strong>{item.name} </strong>
                                  </Link>
                                </td>
                                <td>
                                  {item.quantity} X ₹{item.price} =
                                  <b>₹{item.price * item.quantity}</b>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    ))}
                </table>
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
