import {
  Button,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Meta from '../Meta';
import { URL } from '../../features/productsSlice';
import './contact.scss';


export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    const data = {
      firstName,
      lastName,
      email,
      message,
    };
    await axios.post(`${URL}/api/v1/contact`, data, {headers: {
        'Content-Type': 'application/json',
      }} );
  };
  return (
    <>
      <Meta title={'contact'} />
      <Typography variant="h4" className="text-center mt-2">
        Contact us
      </Typography>
      <div className="contact_form flex-grow-1 d-flex justify-content-center p-4">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <TextField
              fullWidth
              label="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextareaAutosize
              id="msg_area"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></TextareaAutosize>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              fullWidth
              className="logins"
              onClick={() => {
                sendMessage();
              }}
            >
              Send message
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
