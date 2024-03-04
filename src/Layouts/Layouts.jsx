import React from 'react';
import Grid from '@mui/material/Grid';
import Header from '../components/Header/Header';
import Dashboard from '../components/Dashboard/Dashboard';
import './Layouts.css';

const AppLayout = ({children}) => {
  return (
    <Grid container direction="column" className="layouts-container">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container className="dashboard-container">
        <Grid item xs={3}>
          <Dashboard >
            {children}
          </Dashboard>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
