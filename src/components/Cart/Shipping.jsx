import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city';
import Meta from '../Meta';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../features/cartSlice';
import CheckOutSteps from './CheckOutSteps';
import './shipping.scss';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';

export default function Shipping() {
  const dispatch = useDispatch();
  const { loading, shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = () => {
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.info('Phone Number should be 10 digits Long', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate('/order/confirm');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <Meta title="Shipping details" />
          <CheckOutSteps activeStep={0} />
          <div className="shipping d-flex justify-content-center">
            <div className="container  m-3">
              <Typography variant="h5" className="text-center">
                Shipping Details
              </Typography>

              <div className="d-flex flex-column align-items-center p-4">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <TextField
                      name="address"
                      label="Address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={8} md={8} lg={8}>
                    <TextField
                      label="City"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                    <TextField
                      type="number"
                      label="Pin Code"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField
                      type="number"
                      label="Phone Number"
                      required
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      size="10"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <FormControl fullWidth>
                      <InputLabel id="country">Country</InputLabel>
                      <Select
                        labelId="country"
                        value={country}
                        required
                        label="Country"
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <MenuItem key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    {country && (
                      <FormControl fullWidth>
                        <InputLabel id="state">State</InputLabel>
                        <Select
                          value={state}
                          required
                          labelId="state"
                          onChange={(e) => setState(e.target.value)}
                        >
                          {State &&
                            State.getStatesOfCountry(country).map((item) => (
                              <MenuItem key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={12} className="continue">
                    {state ? (
                      <Button
                        className="shippingBtn btn logins"
                        onClick={() => {
                          shippingSubmit();
                        }}
                      >
                        Continue
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </div>
            </div>
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
