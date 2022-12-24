import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemFromCart } from '../../features/cartSlice';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CartItemCard from './CartItemCard';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Meta from '../Meta';
import './cart.scss';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    const obj = {
      id,
      quantity: newQty,
    };
    dispatch(addItemsToCart(obj));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }

    const obj = {
      id,
      quantity: newQty,
    };
    dispatch(addItemsToCart(obj));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="no_items flex-grow-1">
          <RemoveShoppingCartIcon className="fs-2" />

          <Typography variant="h4">No Product in Your Cart</Typography>
          <Link to="/products">
            <Typography color="secondary">View Products</Typography>
          </Link>
        </div>
      ) : (
        <>
          <Meta title="cart" />
          <div className="items_present container-fluid">
            <div className="ip_head d-flex justify-content-between">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div
                  className="cart_card d-flex justify-content-between"
                  key={item.product}
                >
                  <CartItemCard
                    item={item}
                    deleteCartItems={deleteCartItems}
                    className={'cc_qty--opt'}
                  />
                  <div className="cc_qty--opt d-flex justify-content-center">
                    <Button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </Button>
                    <TextField
                      className="cc_qty"
                      variant="outlined"
                      value={item.quantity}
                      readOnly
                    />
                    <Button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Typography
                    variant="body1"
                    className="cc_qty--opt item_price"
                  >{`₹${item.price * item.quantity}`}</Typography>
                </div>
              ))}

            <div className="">
              <div></div>
              <div className="cc_co m-3">
                <div className="d-flex m-1">
                  <p className='me-5'>Gross Total</p>
                  <Typography>{`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</Typography>
                </div>
                <Button className="logins mt-2" onClick={checkoutHandler}>
                  Check Out
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
