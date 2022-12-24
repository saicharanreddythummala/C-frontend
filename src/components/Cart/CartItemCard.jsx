import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './cartItemCard.scss';

export default function CartItemCard({ item, deleteCartItems,className }) {
  return (
    <>
      <div className={`cart_item ${className}`}>
        <img src={item.image} alt={item.name} className='border border-1'/>
        <div className='item_info'>
          <Link to={`/product/${item.product}`}>
            <Typography variant="h6">{item.name}</Typography>
          </Link>
          <Typography variant='body2'>{`Price: ₹${item.price}`}</Typography>
          <Button size= 'small'onClick={() => deleteCartItems(item.product)}>
            Remove
          </Button>
        </div>
      </div>
    </>
  );
}
