import React from 'react';
import Grid from '@mui/material/Grid';
import Header from './Header';
import Dashboard from '../../Layouts/Dashboard/Dashboard';
import './Layouts.css';

const Layouts = () => {
  return (
    <Grid container direction="column" className="layouts-container">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container className="dashboard-container">
        <Grid item xs={3}>
          <Dashboard />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layouts;
