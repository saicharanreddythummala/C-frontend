import React from 'react';
import {Typography} from '@mui/material';
import './footer.scss';

export default function Footer() {
  return (
    <>
      <div id="footer" className="d-flex justify-content-between align-items-center">
        <div>
          <Typography variant="h4">Chocobox</Typography>
        </div>
        <div>
          <Typography variant="h6">Made by Web Dev</Typography>
        </div>
        <div>
          <Typography variant="body1">
            @ 2022 Chocobox. All rights reserved
          </Typography>
        </div>
      </div>
    </>
  );
}
