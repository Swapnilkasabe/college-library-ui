import React from "react";
import { AccountBox as AccountBoxIcon, MenuBook as MenuBookIcon, LocalLibrary as LocalLibraryIcon, LibraryBooks as LibraryBooksIcon, Close as CloseIcon, DoubleArrow as DoubleArrowIcon, ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { IconButton, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from '../../components/Auth/Logout/Logout.jsx'

// Sidebar component to render the navigation sidebar for the application.
const Sidebar = ({ active, setActive, sidebarOpen, setSidebarOpen }) => {
  // Function to handle toggling of the sidebar open/close state
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Grid
      container
      direction="column"
      className={sidebarOpen ? "dashboard-options active" : "dashboard-options"}
    >
      {/* Toggle button to open/close the sidebar */}
      <div item className="sidebar-toggler">
        <IconButton onClick={handleToggleSidebar}>
          {sidebarOpen ? <CloseIcon /> : <DoubleArrowIcon />}
        </IconButton>
      </div>
      <Grid
        item
        className={
          sidebarOpen ? "sidebar-content open" : "dashboard-options closed"
        }
      >
        <div className="dashboard-logo">
          <LibraryBooksIcon />
        </div>
        <Grid item>
          {/* Navigation options for different sections of the application */}
          <Link to={"/student"} className="sidebar-link">
            <Typography
              variant="body1"
              component="p"
              className={`dashboard-option ${
                active === "student" ? "clicked" : ""
              }`}
              onClick={() => setActive("student")}
            >
              <AccountBoxIcon className="dashboard-option-icon" /> Student
            </Typography>
          </Link>
          <Link to={"/book"} className="sidebar-link">
            <Typography
              variant="body1"
              component="p"
              className={`dashboard-option ${
                active === "book" ? "clicked" : ""
              }`}
              onClick={() => setActive("book")}
            >
              <MenuBookIcon className="dashboard-option-icon" /> Book
            </Typography>
          </Link>
          <div className="book-lending-option">
            <Typography
              variant="body1"
              component="p"
              className={`dashboard-option ${
                active === "bookLending" ? "clicked" : ""
              }`}
            >
              <LocalLibraryIcon className="dashboard-option-icon" /> Book
              Lending
              <ArrowDropDownIcon />
            </Typography>
            {/* Submenu options for book lending */}
            <div className="book-lending-submenu">
              <Link to={"/issue-book"} className="sidebar-link">
                <Typography
                  variant="body1"
                  component="p"
                  className={`dashboard-option ${
                    active === "studentPage" ? "clicked" : ""
                  }`}
                  onClick={() => setActive("studentPage")}
                >
                  <AccountBoxIcon className="dashboard-option-icon" /> Student
                  Page
                </Typography>
              </Link>
              <Link to={"/assign-borrower"} className="sidebar-link">
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
              </Link>
              <div
                className="sidebar-toggler"
                onClick={handleToggleSidebar}
              ></div>
            </div>
            <div className="sidebar-logout">
                <Logout />
              </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
