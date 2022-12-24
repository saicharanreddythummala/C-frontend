import React from 'react';
import './Home.scss';
import home from '../../assets/home.jpg';
import Card from '../Card/Card';
import Meta from '../Meta';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productsSlice';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const { products, error } = useSelector((state) => state.products);

  // const [currentPage, setcurrentPage] = useState(1);
  // const [price, setPrice] = useState([0, 25000]);
  // const [category, setCategory] = useState('');
  // const [ratings, setRatings] = useState(0);

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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

  const dispatch = useDispatch();

  useEffect(() => {
    const keyword = '';
    const currentPage = 1;
    const price = [0, 25000];
    const category = '';
    const ratings = 0;

    const obj = {
      keyword,
      currentPage,
      price,
      category,
      ratings,
    };
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
    dispatch(fetchProducts(obj));
  }, [dispatch, error]);

  return (
    <>
      <Meta title="Home" />
      <div id="home" className="">
        <div className="home_display">
          <img src={home} alt="home-img" />
          <Button onClick={() => navigate('/products')}>
            Discover more products
          </Button>
        </div>
        <div className="featured">
          <Typography variant="h6" className="text-center m-3">
            Shop by featured products
          </Typography>
          <Typography variant="h4" className="text-center">
            Featured Products
          </Typography>

          <div className="container d-flex flex-column justify-content-center">
            <div>
              {products && (
                <Slider {...settings}>
                  {products.map((product) => (
                    <Card key={product._id} product={product} />
                  ))}
                </Slider>
              )}
            </div>
          </div>
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
