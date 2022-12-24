import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './dashboardHome.scss';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardHome({ orders, users }) {
  const { products } = useSelector((state) => state.admin);

  let outOfStock = 0;

  products.length > 0 &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders.orders &&
    orders.orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#333333', '#cfcfdd'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      <div className="dashboardContainer container-fluid">
        <Typography variant="h4" className="text-center mt-2">
          Dashboard
        </Typography>

        <div className="dashboardSummary">
          <div className="dash_top text-center mt-2">
            <Typography variant="body1">Total Amount</Typography>
            <Typography variant="body2">₹{totalAmount}</Typography>
          </div>
          <div className="dashboardSummaryBox2 d-flex justify-content-around mt-4">
            <Link to="/admin/dashboard/products">
              <div className="dash_info">
                <Typography>Total no. of products</Typography>
                <Typography>{products.length}</Typography>
              </div>
            </Link>
            <Link to="/admin/dashboard/orders">
              <div className="dash_info">
                <Typography>All orders</Typography>
                <Typography>{orders.orders && orders.orders.length}</Typography>
              </div>
            </Link>
            <Link to="/admin/dashboard/users">
              <div className="dash_info">
                <Typography>All users</Typography>
                <Typography>{users.users && users.users.length}</Typography>
              </div>
            </Link>
          </div>
        </div>

        <div className="doughnutChart d-flex justify-content-center">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </>
  );
}
