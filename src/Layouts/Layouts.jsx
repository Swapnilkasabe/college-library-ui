import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";
import { useAppContext } from "../contexts/AppContext.Provider";
import localStorageService from "../services/localStorageService";
import StatisticsSummary from "../components/Home/StatisticsSummary";
import { useLocation } from "react-router-dom";

// AppLayout component for the layout of the application
const AppLayout = ({ children }) => {
  // Access state and function from context
  const { isLogin, setIsLogin } = useAppContext();

  // Hook to get current location
  const location = useLocation();

  // Effect to check if user has a valid token
  useEffect(() => {
    const token = localStorageService.get("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  return (
    <Grid container direction="column" className="layouts-container">
      <Grid item>
        <Header />
      </Grid>
      {isLogin && location.pathname !== "/profile" ? (
        <Grid container item className="dashboard-container">
          <Grid item>
            <Dashboard>
              {/* Render StatisticsSummary component on home page */}
              {location.pathname === "/" && <StatisticsSummary />}
              {children}
            </Dashboard>
          </Grid>
        </Grid>
      ) : (
        children
      )}
    </Grid>
  );
};

export default AppLayout;
