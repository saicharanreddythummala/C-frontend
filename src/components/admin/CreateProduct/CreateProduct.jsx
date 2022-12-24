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
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './createProduct.scss';
import {
  createProductAdmin,
  resetNewProduct,
} from '../../../features/adminProductsSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Meta from '../../Meta';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateProduct() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, newProduct } = useSelector((state) => state.admin);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const categories = [
    'Oreo',
    'Cookie',
    'Cocoa',
    'Paan',
    'Coconut',
    'Pistachio',
    'Sprinkle',
  ];

  const createProductHandler = () => {
    const obj = {
      name,
      price,
      description,
      category,
      stock,
      images,
    };
    dispatch(createProductAdmin(obj));
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
    if (newProduct.success) {
      toast.info('Product created successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/admin/dashboard');
      dispatch(resetNewProduct());
    }
  }, [dispatch, error, newProduct.success, navigate]);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Meta title={'create product'} />
      <div className="create_prod">
        <Typography variant="h4" className="text-center mb-3">
          Create Product
        </Typography>
        <div className="d-flex justify-content-center">
          <Grid container spacing={3} className="mb-2">
            <Grid item xs={12} md={12}>
              <div>
                <TextField
                  type="text"
                  label="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              {' '}
              <div>
                <TextField
                  fullWidth
                  value={price}
                  type="number"
                  label="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              {' '}
              <div>
                <TextField
                  label="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="update_category">Category</InputLabel>
                  <Select
                    fullWidth
                    labelId="update_category"
                    label="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cate,i) => (
                      <MenuItem key={i} value={cate}>
                        {cate}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div>
                <TextField
                  type="number"
                  label="Stock"
                  fullWidth
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div>
                <TextField
                  fullWidth
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  multiple
                  onChange={(e) => createProductImagesChange(e)}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="updt_img">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                className="logins"
                disabled={loading ? true : false}
                onClick={()=>createProductHandler()}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </div>
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
