import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../features/productsSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from '@mui/material';
import ReviewCard from '../Card/ReviewCard';
import Loader from '../Loader/Loader';
import { addItemsToCart } from '../../features/cartSlice';
import Meta from '../Meta';
import './productDetail.scss';
import { newReview } from '../../features/reviewSlice';
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const params = useParams();

  const { product, loading, error } = useSelector((state) => state.product);
  const { success, error: revError } = useSelector((state) => state.newReview);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  //increase product quantity
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  //decrease product quantity
  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  //add products to cart
  const addToCartHandler = () => {
    const obj = { id: params.id, quantity };
    dispatch(addItemsToCart(obj));
    toast.info('Item Added To Cart', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  // open/close review dialog box
  const reviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  //sumbit review
  const reviewHandler = () => {
    const reviewData = {
      rating,
      comment,
      productId: params.id,
    };

    dispatch(newReview(reviewData));
    setOpen(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    if (revError) {
      toast.info(revError, {
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
    if (success.success) {
      toast.info(success.success, {
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
    dispatch(getProductDetail(params.id));
  }, [dispatch, params.id, error, revError, success]);

  const options = {
    name: 'read-only',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: 'small',
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Meta title={`${product.name}`} />
          <div className="container-fluid d-flex" id="product_detail">
            <div className="product_imgs col col-sm-3">
              <Slider {...settings}>
                {product.images !== undefined
                  ? product.images.map((img, i) => (
                      <img src={img.url} key={i} alt={product.name} />
                    ))
                  : null}
              </Slider>
            </div>

            <div className="product_info col col-sm-9">
              <h3 className="mb-2 border-bottom">{product.name}</h3>

              <p className="mb-2 border-bottom">{product.description}</p>

              <div className="ratings border-bottom">
                <span>
                  <Rating {...options} />
                </span>
                | <span>user reviews(0)</span> |{' '}
                <span id="newReview" onClick={reviewToggle}>
                  Write a review
                </span>
              </div>

              <p className="border-bottom">₹ {product.price}</p>

              <div className="product_info_all">
                <p>Available in stock: {product.stock}</p>
                <div className="d-flex">
                  <div className="border p-0">
                    <button className="btn" onClick={decreaseQuantity}>
                      -
                    </button>
                    <input type="number" value={quantity} readOnly />
                    <button className="btn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                  <div className="ms-2 flex-1">
                    <Button
                      variant="container logins"
                      disabled={product.stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={reviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={+rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <button onClick={reviewToggle} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={reviewHandler} className="btn btn-primary">
                Submit
              </button>
            </DialogActions>
          </Dialog>

          <div className="reviews border border-1">
            <Typography variant="h5">Reviews</Typography>
            {product.reviews && product.reviews[0] ? (
              <>
                {product.reviews &&
                  product.reviews.map((rev) => (
                    <ReviewCard key={rev._id} review={rev} />
                  ))}
              </>
            ) : (
              <p className="">No Reviews Yet</p>
            )}
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
