import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  LibraryBooks as LibraryBooksIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import localStorageService from "../../services/localStorageService";
import { useAppContext } from "../../contexts/AppContext.Provider";
import "./Header.css";

const Header = () => {
  // State to manage the profile menu
  const [menuAnchor, setMenuAnchor] = useState(null);
  // Hook for navigating between pages
  const navigate = useNavigate();
  // Hook to get current location
  const location = useLocation();
  // Access states from context
  const { isLogin, setIsLogin } = useAppContext();

  // Function to handle opening the profile menu
  const handleProfileMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  // Function to handle closing the profile menu
  const handleProfileMenuClose = () => {
    setMenuAnchor(null);
  };

  // Function to handle logout
  const handleLogout = () => {
    try {
      // Clear user data from local storage
      localStorageService.clear();
      setIsLogin(false);
      // Redirect to the login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Check if the current path is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <AppBar position="static" className="custom-appbar">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="header-link">
            <LibraryBooksIcon /> College Library
          </Link>
        </Typography>
        {isLogin && !isLoginPage && (
          <div>
            {/* Profile icon button */}
            <Tooltip title="Quick Links" arrow>
              <IconButton color="inherit" onClick={handleProfileMenuClick}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            {/* Profile menu */}
            <Menu
              menuAnchor={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                component={Link}
                to="/"
                onClick={handleProfileMenuClose}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleProfileMenuClose}
              >
                My Profile
              </MenuItem>
              <Divider />
               {/* Logout icon button */}
              <MenuItem onClick={handleLogout}>
                <LogoutIcon /> Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
