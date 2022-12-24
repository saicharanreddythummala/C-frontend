import React from 'react';
import './Card.scss';
import { Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Card({ product }) {
  const options = {
    name: 'read-only',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: 'small',
  };


  return (
    <>
      <Link className="prod_card" to={`/product/${product._id}`}>
        <div className="card d-flex justify-content-center">
          <div className="card-img">
            <img
              src={product.images[0] !== undefined ? product.images[0].url : ''}
              alt={product.name}
            />
          </div>
          <div className="card-body">
            <Rating {...options} /> |{' '}
            <span>{product.reviews.length} reviews</span>
            <Typography>{product.name}</Typography>
            <p>₹​ {product.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
