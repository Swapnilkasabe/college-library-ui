import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useAppContext } from "../../contexts/AppContext.Provider";
import { Grid } from "@mui/material";
import "./Dashboard.css";

// Dashboard component renders the main layout of the application, including the sidebar navigation and content display
const Dashboard = ({ children }) => {
      // Accessing context values
  const { active, setActive, sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <Grid container className="dashboard">
      <Grid item className="dashboard-card">
        {/* Sidebar component for navigation  */}
        <Sidebar
          active={active}
          setActive={setActive}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Content area for rendering different components based on the active sidebar item */}
        <Grid item >
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
