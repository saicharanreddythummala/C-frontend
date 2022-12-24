import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUserAdmin } from '../../../features/adminUsers';
import { getAllUsersAdmin } from '../../../features/adminProductsSlice';
import { resetAdminDeleted } from '../../../features/adminOrders';
import Meta from '../../Meta';
import { ToastContainer, toast } from 'react-toastify';

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteUserHandler = (id) => {
    dispatch(deleteUserAdmin(id));
  };

  const { error, users } = useSelector((state) => state.admin);
  const { error: userError, deleted } = useSelector(
    (state) => state.adminUsers
  );

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
    if (userError) {
      toast.info(userError, {
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
    if (deleted.success) {
      toast.info(deleted.success, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('admin/dashboard');
      dispatch(resetAdminDeleted());
    }
    dispatch(getAllUsersAdmin());
  }, [dispatch, error, userError, deleted.success, navigate]);

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.8 },

    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, 'role') === 'admin'
          ? 'greenColor'
          : 'redColor';
      },
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/dashboard/user/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users.users &&
    users.users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <Meta title="all users" />
      <div className="productListContainer">
        <Typography variant="h4" className="text-center mt-2">
          All users
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
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
