import React from "react";
import Sidebar from '../Siderbar/Sidebar';
import {useAppContext} from '../../contexts/AppContext.Provider'
import "./Dashboard.css";

// Dashboard component renders the main layout of the application, including the sidebar navigation and content display
const Dashboard = ({children}) => {
  // Accessing context values
  const { active, setActive, sidebarOpen, setSidebarOpen } = useAppContext();


  return (
    <div className="dashboard">
      <div className="dashboard-card">
        {/* Sidebar component for navigation  */}
        <Sidebar
          active={active}
          setActive={setActive}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Content area for rendering different components based on the active sidebar item */}
        <div >
         {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
