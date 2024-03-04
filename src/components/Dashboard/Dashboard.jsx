import React, { useState } from "react";
import Sidebar from '../Siderbar/Sidebar';
import Student from '../../Pages/Student';
import Book from '../../Pages/Book';
import BookLending from '../../Pages/BookLending';
import StudentBookAssignment from '../../Pages/StudentBookAssignment';
import BookStudentAssignment from '../../Pages/BookStudentAssignment';
import "./Dashboard.css";

// Dashboard component renders the main layout of the application, including the sidebar navigation and content display.
const Dashboard = ({children}) => {
  // State variables to manage the active sidebar item and sidebar open/close state
  const [active, setActive] = useState("students");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
