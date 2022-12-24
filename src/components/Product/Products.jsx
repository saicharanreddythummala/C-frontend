import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productsSlice';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import Meta from '../Meta';
import Pagination from 'react-js-pagination';
import { Button, Grid, Slider } from '@mui/material';
import { useMatch } from 'react-router-dom';
import './products.scss';

export default function Products() {
  const dispatch = useDispatch();
  const {
    loading,
    products,
    productCount,
    productsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const match = useMatch('/products/:keyword');

  const keyword = match ? match.params.keyword : '';
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
  const [filter, setFilter] = useState(false);

  const categories = [
    'Oreo',
    'Cookie',
    'Cocoa',
    'Paan',
    'Coconut',
    'Pistachio',
    'Sprinkle',
  ];

  //filter toggle
  const filterToggle = () => {
    setFilter(!filter);
  };

  const removeFilters = () => {
    setCategory('');
    setPrice([0, 25000]);
    setCategory(0);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const ratingHandler = (e, newRating) => {
    setRatings(newRating);
  };

  useEffect(() => {
    const obj = {
      keyword,
      currentPage,
      price,
      category,
      ratings,
    };
    dispatch(fetchProducts(obj));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <Meta title="Products" />

          <div className="container-fluid d-flex" id="products">
            <div
              className={
                filter ? 'mob_filter' : 'filters col-lg-2 col-md-3 p-3'
              }
            >
              <div className="filter_main border border-2 mb-3 p-3">
                <p className="filter_head">Categories</p>
                <ul className="">
                  {categories.map((category) => (
                    <li
                      className=""
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filter_main border border-2 mb-3 p-3">
                <p className="filter_head">Price</p>
                <Slider
                  value={price}
                  onChangeCommitted={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />
              </div>

              <div className="filter_main border border-2 mb-3 p-3">
                <p className="filter_head">Ratings</p>
                <Slider
                  value={ratings}
                  onChangeCommitted={ratingHandler}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  marks
                  step={1}
                  min={0}
                  max={5}
                />
              </div>
              <div className="filter_main d-flex mb-3 justify-content-center">
                <Button variant="contained" onClick={filterToggle}>
                  Apply filters
                </Button>
              </div>
              <div className="filter_main d-flex justify-content-center">
                <Button
                  variant="contained"
                  onClick={() => {
                    removeFilters();
                    if (window.innerWidth < 600) {
                      filterToggle();
                    }
                  }}
                >
                  Remove filters
                </Button>
              </div>
            </div>

            <div className="prod_container col-lg-10 col-md-9 border border-1 m-2">
              {window.innerWidth < 601 ? (
                <Button onClick={filterToggle}>Filters</Button>
              ) : null}
              <div className="container-fluid d-flex justify-content-center p-3">
                <Grid container spacing={2}>
                  {products &&
                    products.map((product, index) => (
                      <Grid item xs={6} md={4} sm={6} lg={3} key={index}>
                        <Card key={product._id} product={product} />
                      </Grid>
                    ))}
                </Grid>
              </div>

              {productsPerPage < filteredProductsCount && (
                <div className="pagination d-flex justify-content-center align-items-center">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={productsPerPage}
                    totalItemsCount={productCount}
                    onChange={(e) => setcurrentPage(e)}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
