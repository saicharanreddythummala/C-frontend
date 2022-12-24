import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProductAdmin,
  getAllProductsAdmin,
} from '../../../features/adminProductsSlice';
import { DataGrid } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Meta from '../../Meta';
import { ToastContainer, toast } from 'react-toastify';


export default function ProductList() {
  const dispatch = useDispatch();

  const { error, isDeleted, products } = useSelector((state) => state.admin);

  //delete product
  const deleteProductHandler = (id) => {
    dispatch(deleteProductAdmin(id));
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
    dispatch(getAllProductsAdmin());
  }, [dispatch, error, isDeleted]);

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'price',
      headerName: 'Price',
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
            <Link to={`/admin/dashboard/editProduct/${params.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products.length > 0 &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <>
      <Meta title={'all products'}/>
      <div className="productListContainer">
        <Typography variant="h4" className="text-center mt-2">
          ALL PRODUCTS
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
