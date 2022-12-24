import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './editProduct.scss';
import {
  editProductAdmin,
  resetUpdatedProduct,
} from '../../../features/adminProductsSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail } from '../../../features/productsSlice';
import Meta from '../../Meta';
import { toast, ToastContainer } from 'react-toastify';

export default function EditProduct() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();

  const { product, error } = useSelector((state) => state.product);
  const {
    loading,
    error: adminError,
    updatedProduct,
  } = useSelector((state) => state.admin);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const categories = [
    'Oreo ',
    'Cookie ',
    'Cocoa ',
    'Paan ',
    'Coconut ',
    'Pistachio ',
    'Sprinkle ',
  ];

  const productId = params.id;

  const editProductHandler = () => {
    const obj = {
      name,
      price,
      description,
      category,
      stock,
      images,
    };
    dispatch(editProductAdmin({ productId, obj }));
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetail(params.id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
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

    if (adminError) {
      toast.info(adminError, {
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

    if (updatedProduct.success) {
      toast.info('Product Updated', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      navigate('/admin/dashboard/products');
      dispatch(resetUpdatedProduct());
    }
  }, [
    dispatch,
    error,
    updatedProduct.success,
    product,
    productId,
    adminError,
    navigate,
    params.id,
  ]);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <Meta title="edit product" />
      <div className="create_prod container">
        <Typography variant="h4" className="text-center mt-2">
          Edit Product
        </Typography>
        <div className="create_prod_f d-flex justify-content-center">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div>
                <TextField
                  fullWidth
                  label="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={price}
                type="number"
                label="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></TextareaAutosize>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="create_prod-cat">update category</InputLabel>
                <Select
                  labelId="create_prod-cat"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <input
                  fullWidth
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  multiple
                  onChange={(e) => updateProductImagesChange(e)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                className="logins mb-2"
                disabled={loading ? true : false}
                onClick={() => editProductHandler()}
              >
                Update
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
