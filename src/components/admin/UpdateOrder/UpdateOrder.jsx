import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../../features/orderDetailsSlice';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import './updateOrder.scss';
import {
  resetAdminUpdated,
  updateOrderAdmin,
} from '../../../features/adminOrders';
import Meta from '../../Meta';
import { ToastContainer, toast } from 'react-toastify';

export default function UpdateOrder() {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { error: updateError, updated } = useSelector(
    (state) => state.adminOrders
  );

  const [status, setStatus] = useState('');

  const updateOrderHandler = () => {
    const data = {
      id: params.id,
      status,
    };

    dispatch(updateOrderAdmin(data));
  };

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
    if (updateError) {
      toast.info(updateError, {
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
      toast.info('Order Updated Successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      dispatch(resetAdminUpdated());
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id, updateError, updated.success]);

  return (
    <>
      <div className="update_order">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Meta title="update order" />
            <div className="d-flex">
              <div className="orderDetailsPage d-flex flex-column align-items-center pt-4 col-lg-7 col-md-12">
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
                            order.paymentInfo &&
                            order.paymentInfo.status === 'succeeded'
                              ? 'greenColor '
                              : 'redColor '
                          }
                        >
                          {' '}
                          {order.paymentInfo &&
                          order.paymentInfo.status === 'succeeded'
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
                              <img
                                id="ord_img"
                                src={item.image}
                                alt="Product"
                              />
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

              <div className="updateOrderForm col-lg-5 col-md-12 p-2">
                <Typography variant="h4" className="text-center mt-3">
                  Process Order
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="update_status">update status</InputLabel>

                      <Select
                        labelId="update_status"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="">Choose Category</MenuItem>
                        {order.orderStatus === 'Processing' && (
                          <MenuItem value="Shipped">Shipped</MenuItem>
                        )}

                        {order.orderStatus === 'Shipped' && (
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      className="logins"
                      onClick={() => updateOrderHandler()}
                      disabled={
                        loading ? true : false || status === '' ? true : false
                      }
                    >
                      Process
                    </Button>
                  </Grid>
                </Grid>
              </div>
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
