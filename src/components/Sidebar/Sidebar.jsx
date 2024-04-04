import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CloseIcon from "@mui/icons-material/Close";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";


// Sidebar component to render the navigation sidebar for the application.
const Sidebar = ({ active, setActive, sidebarOpen, setSidebarOpen }) => {
  // Function to handle toggling of the sidebar open/close state
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Grid container direction="column" className={sidebarOpen ? "dashboard-options active" : "dashboard-options"}>
      {/* Toggle button to open/close the sidebar */}
      <div item className="sidebar-toggler">
        <IconButton onClick={handleToggleSidebar}>
          {sidebarOpen ? < CloseIcon /> : <DoubleArrowIcon />}
        </IconButton>
      </div>
      <Grid item className={sidebarOpen ? "sidebar-content open" : "dashboard-options closed"}>
        <div className="dashboard-logo">
          <LibraryBooksIcon />
          <Typography variant="h6" component="p" className="logo-name">
            Library
          </Typography>
        </div>
        <Grid item>
          {/* Navigation options for different sections of the application */}
          <Link to={'/student'} className="sidebar-link">
            <Typography
              variant="body1"
              component="p"
              className={`dashboard-option ${active === "student" ? "clicked" : ""}`}
              onClick={() => setActive("student")}
            >
              <AccountBoxIcon className="dashboard-option-icon" /> Student
            </Typography>
          </Link>
          <Link to={'/book'} className="sidebar-link">
            <Typography
              variant="body1"
              component="p"
              className={`dashboard-option ${active === "book" ? "clicked" : ""}`}
              onClick={() => setActive("book")}
            >
              <MenuBookIcon className="dashboard-option-icon" /> Book
            </Typography>
          </Link>
          <div className="book-lending-option">
            <Typography
              variant="body1"
              component="p"
              className={`dashboard-option ${active === "bookLending" ? "clicked" : ""}`}
            >
              <LocalLibraryIcon className="dashboard-option-icon" /> Book Lending
              <ArrowDropDownIcon/>
            </Typography>
            {/* Submenu options for book lending */}
            <div className="book-lending-submenu">
              <Link to={'/studentBookAssignment'} className="sidebar-link">
                <Typography
                  variant="body1"
                  component="p"
                  className={`dashboard-option ${active === "studentPage" ? "clicked" : ""}`}
                  onClick={() => setActive("studentPage")}
                >
                  <AccountBoxIcon className="dashboard-option-icon" /> Student Page
                </Typography>
              </Link>
              <Link to={'/bookStudentAssignment'} className="sidebar-link">
                <Typography
                  variant="body1"
                  component="p"
                  className={`dashboard-option ${active === "bookPage" ? "clicked" : ""}`}
                  onClick={() => setActive("bookPage")}
                >
                  <MenuBookIcon className="dashboard-option-icon" /> Book Page
                </Typography>
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
