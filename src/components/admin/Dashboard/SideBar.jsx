import React from 'react';
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column">
      <div className="pt-2 pb-2 text-center fs-3">
        <Link to="/">
          <img src={''} alt="Chocobox" />
        </Link>
      </div>

      <ul className="dashboard_links flex-grow-1 d-flex flex-column justify-content-evenly">
        <li>
          <Link to="/admin/dashboard">
            <p>
              <DashboardIcon /> Dashboard
            </p>
          </Link>
        </li>
        <li>
          {' '}
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/dashboard/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>

              <Link to="/admin/dashboard/product">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </li>
        <li>
          <Link to="/admin/dashboard/orders">
            <p>
              <ListAltIcon /> Orders
            </p>
          </Link>
        </li>
        <li>
          {' '}
          <Link to="/admin/dashboard/users">
            <p>
              <PeopleIcon /> Users
            </p>
          </Link>
        </li>
        <li>
          {' '}
          <Link to="/admin/dashboard/reviews">
            <p>
              <RateReviewIcon /> Reviews
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
