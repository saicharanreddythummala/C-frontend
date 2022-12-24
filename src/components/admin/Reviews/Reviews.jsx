import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteReviewsAdmin,
  getAllReviewsAdmin,
  resetDeleteReview,
} from '../../../features/adminReviews';
import { Button, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Meta from '../../Meta';
import './reviews.scss';
import { ToastContainer, toast } from 'react-toastify';

export default function Reviews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productId, setProductId] = useState('');

  const { error, reviews, loading, deleted } = useSelector(
    (state) => state.adminReviews
  );

  const deleteReviewHandler = (reviewId) => {
    const obj = {
      reviewId,
      productId,
    };
    dispatch(deleteReviewsAdmin(obj));
  };

  const productReviewsSubmitHandler = () => {
    dispatch(getAllReviewsAdmin(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviewsAdmin(productId));
    }
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
      toast.info('Review Deleted Successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/admin/dashboard/reviews');
      dispatch(resetDeleteReview());
    }
  }, [dispatch, productId, error, deleted.success, navigate]);

  const columns = [
    { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },

    {
      field: 'user',
      headerName: 'User',
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: 'comment',
      headerName: 'Comment',
      minWidth: 350,
      flex: 1,
    },

    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, 'rating') >= 3
          ? 'greenColor'
          : 'redColor';
      },
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews.reviews &&
    reviews.reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <Meta title="all reviews" />
      <div className="all_reviews d-flex flex-column align-items-center">
        <Typography variant="h4" className="mt-2 text-center">
          All reviews
        </Typography>
        <div className="all_reviews_f container">
          <TextField
            fullWidth
            label="Product Id"
            required
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <Button
            disabled={loading ? true : false || productId === '' ? true : false}
            onClick={() => productReviewsSubmitHandler()}
          >
            Search
          </Button>
        </div>

        {reviews.reviews && reviews.reviews.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        ) : (
          <Typography variant="body1" className="text-center" color="secondary">
            No Reviews Found
          </Typography>
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
