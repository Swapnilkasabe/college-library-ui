import React from 'react';
import Grid from '@mui/material/Grid';
import Header from '../components/Header/Header';
import Dashboard from '../components/Dashboard/Dashboard';
import './Layouts.css';
import { useAppContext } from "../contexts/AppContext.Provider";

const AppLayout = ({ children }) => {
  const { isLogin } = useAppContext();

  return (
    <Grid container direction="column" className="layouts-container">
      {isLogin ? ( 
        <>
          <Grid item>
            <Header />
          </Grid>
          <Grid item container className="dashboard-container">
            <Grid item xs={3}>
              <Dashboard>
                {children}
              </Dashboard>
            </Grid>
          </Grid>
        </>
      ):<>
      {children}</>}
    </Grid>
  );
};


export default AppLayout;
