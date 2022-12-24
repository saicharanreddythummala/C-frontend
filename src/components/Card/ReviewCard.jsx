import React from 'react'
import { Rating, Typography } from '@mui/material';

export default function ReviewCard({review}) {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <>
       <div className="border-bottom">
      <Typography variant='h6'>{review.name}</Typography>
      <p  className="reviewCardComment">{review.comment}</p>
      <Rating {...options} />
    </div>
    </>
  )
}
