import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { myOrders } from '../../features/myOrdersSlice';
import LaunchIcon from '@mui/icons-material/Launch';
import Meta from '../Meta';
import { Typography } from '@mui/material';
import Loader from '../Loader/Loader';
import { DataGrid } from '@mui/x-data-grid';

export default function MyOrders() {
  const dispatch = useDispatch();

  const { loading, allOrders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/orderDetails/${params.getValue(params.id, 'id')}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  if (allOrders.orders !== undefined) {
    allOrders.orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  }

  return (
    <>
      <Meta title={`${user.name}`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Typography className="fs-5 m-2">{user.name}'s Orders</Typography>
          <div className="m-2">
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              rowsPerPageOptions={[100]}
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
}
