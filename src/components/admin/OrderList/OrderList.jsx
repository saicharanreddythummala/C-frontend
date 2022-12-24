import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { Link} from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import {
  deleteOrderAdmin,
  getAllOrdersAdmin,
  resetAdminDeleted,
} from '../../../features/adminOrders';
import Meta from '../../Meta';
import { toast, ToastContainer } from 'react-toastify';

export default function OrderList() {
  const dispatch = useDispatch();

  const { error, deleted, orders } = useSelector((state) => state.adminOrders);

  //delete order --admin
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderAdmin(id));
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
    if (deleted.success) {
      toast.info('product delete successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      dispatch(resetAdminDeleted());
    }
    dispatch(getAllOrdersAdmin());
  }, [dispatch, error, deleted.success]);

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
      flex: 0.4,
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
          <Fragment>
            <Link to={`/admin/dashboard/order/${params.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders.orders &&
    orders.orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
    <Meta title={'all orders'}/>
      <div className="productListContainer">
        <Typography variant="h4" className="text-center mt-2">
          All orders
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
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
