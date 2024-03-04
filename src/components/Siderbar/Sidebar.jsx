import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CloseIcon from "@mui/icons-material/Close";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { IconButton, Typography } from "@mui/material";

import "./Sidebar.css";

// Sidebar component to render the navigation sidebar for the application.
const Sidebar = ({ active, setActive, sidebarOpen, setSidebarOpen }) => {
  // Function to handle toggling of the sidebar open/close state
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={sidebarOpen ? "dashboard-options active" : "dashboard-options"}
    >
      <div className="dashboard-logo">
        <LibraryBooksIcon />
        <Typography variant="h6" component="p" className="logo-name">
          Library
        </Typography>
      </div>
      {/* Navigation options for different sections of the application */}
      <Typography
        variant="body1"
        component="p"
        className={`dashboard-option ${active === "student" ? "clicked" : ""}`}
        onClick={() => setActive("student")}
      >
        <AccountBoxIcon className="dashboard-option-icon" /> Student
      </Typography>
      <Typography
        variant="body1"
        component="p"
        className={`dashboard-option ${active === "book" ? "clicked" : ""}`}
        onClick={() => setActive("book")}
      >
        <MenuBookIcon className="dashboard-option-icon" /> Book
      </Typography>
      <div className="book-lending-option">
        <Typography
          variant="body1"
          component="p"
          className={`dashboard-option ${
            active === "bookLending" ? "clicked" : ""
          }`}
        >
          <LocalLibraryIcon className="dashboard-option-icon" /> Book Lending
        </Typography>
        {/* Submenu options for book lending */}
        <div className="book-lending-submenu">
          <Typography
            variant="body1"
            component="p"
            className={`dashboard-option ${
              active === "studentPage" ? "clicked" : ""
            }`}
            onClick={() => setActive("studentPage")}
          >
            <AccountBoxIcon className="dashboard-option-icon" /> Student Page
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={`dashboard-option ${
              active === "bookPage" ? "clicked" : ""
            }`}
            onClick={() => setActive("bookPage")}
          >
            <MenuBookIcon className="dashboard-option-icon" /> Book Page
          </Typography>
        </div>
      </div>
      {/* Toggle button to open/close the sidebar */}
      <IconButton onClick={handleToggleSidebar}>
        {sidebarOpen ? <CloseIcon /> : <DoubleArrowIcon />}
      </IconButton>
    </div>
  );
};

export default Sidebar;
