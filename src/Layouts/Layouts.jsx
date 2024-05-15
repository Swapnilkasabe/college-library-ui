import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";
import { useAppContext } from "../contexts/AppContext.Provider";
import localStorageService from "../services/localStorageService";

// AppLayout component for the layout of the application
const AppLayout = ({ children }) => {
  const {
    isLogin,
    setIsLogin,
  } = useAppContext();

  // Effect to check if user has a valid token 
  useEffect(() => {
    const token = localStorageService.get("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);


  return (
    <Grid container direction="column" className="layouts-container">  
      {isLogin ? (
        <>
          <Grid item>
            <Header />
          </Grid>
          <Grid container item className="dashboard-container">
            <Grid item>
              <Dashboard>{children}</Dashboard>
            </Grid>
          </Grid>
        </>
      ) : (
        <>{children}</>
      )}
    </Grid>
  );
};

export default AppLayout;
