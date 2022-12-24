import React, { useEffect } from 'react';
import Sidebar from './SideBar';
import '../Dashboard/dashboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrdersAdmin,
  getAllProductsAdmin,
  getAllUsersAdmin,
} from '../../../features/adminProductsSlice';
import DashboardHome from '../Home/DashboardHome';
import { Routes, Route } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import CreateProduct from '../CreateProduct/CreateProduct';
import EditProduct from '../EditProduct/EditProduct';
import OrderList from '../OrderList/OrderList';
import UpdateOrder from '../UpdateOrder/UpdateOrder';
import UsersList from '../Users/UsersList';
import EditUser from '../Users/EditUser';
import Reviews from '../Reviews/Reviews';
import Meta from '../../Meta';

export default function Dashboard() {
  const dispatch = useDispatch();

  const { products, orders, users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllProductsAdmin());
    dispatch(getAllOrdersAdmin());
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  return (
    <>
    <Meta title={'admin dashboard'}/>
      <div id="dashboard" className="flex-grow-1">
          <Sidebar />
          <div id="dashboard_wrapper">
            <Routes>
              <Route
                path={'/'}
                element={
                  <DashboardHome
                    products={products}
                    orders={orders}
                    users={users}
                  />
                }
              />
              <Route
                path={'/products'}
                element={
                  <ProductList
                    products={products}
                    orders={orders}
                    users={users}
                  />
                }
              />
              <Route path={'/product'} element={<CreateProduct />} />
              <Route path={'/editProduct/:id'} element={<EditProduct />} />
              <Route path={'/orders'} element={<OrderList />} />
              <Route path={'/order/:id'} element={<UpdateOrder />} />
              <Route path={'/users'} element={<UsersList />} />
              <Route path={'/users'} element={<UsersList />} />
              <Route path={'/user/:id'} element={<EditUser />} />
              <Route path={'/reviews'} element={<Reviews />} />
            </Routes>
          </div>
      </div>
    </>
  );
}
