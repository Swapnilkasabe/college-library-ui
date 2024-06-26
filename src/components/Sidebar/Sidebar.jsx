import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery, Box, Drawer, List, Divider, IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Logout, ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { AccountBox as AccountBoxIcon, MenuBook as MenuBookIcon, LocalLibrary as LocalLibraryIcon, History as HistoryIcon, ListAlt as ListAltIcon } from "@mui/icons-material";
import localStorageService from "../../services/localStorageService";
import { useAppContext } from "../../contexts/AppContext.Provider";

const drawerWidth = 240;

// Main content area styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    overflowY: "auto",
  })
);

// Header for the drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// Sidebar component to render the navigation sidebar for the application.
const Sidebar = ({ active, setActive, sidebarOpen, setSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setIsLogin } = useAppContext();


  const isCompactScreen = useMediaQuery("(max-width:855px)");

  // Effect to open/close sidebar based on screen size
  useEffect(() => {
    if (isCompactScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isCompactScreen, setSidebarOpen]);

    // Handle closing the drawer
  const handleDrawerClose = () => {
    setSidebarOpen(false);
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

  // Handle clicking on a sidebar option
  const handleOptionClick = (option) => {
    setActive(option);
    if (isCompactScreen) {
      setSidebarOpen(false);
    }
  };

    // Submenu state
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const toggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/student" className="sidebar-link">
            <ListItemButton
              selected={active === "student"}
              onClick={() => handleOptionClick("student")}
              sx={{
                color: active === "student" ? theme.palette.primary.main : "inherit",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <ListItemIcon><AccountBoxIcon /></ListItemIcon>
              <ListItemText primary="Student" />
            </ListItemButton>
          </Link>
          <Link to="/book" className="sidebar-link">
            <ListItemButton
              selected={active === "book"}
              onClick={() => handleOptionClick("book")}
              sx={{
                color: active === "book" ? theme.palette.primary.main : "inherit",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <ListItemIcon><MenuBookIcon /></ListItemIcon>
              <ListItemText primary="Book" />
            </ListItemButton>
          </Link>
          <ListItemButton onClick={() => toggleSubmenu("bookLending")}>
            <ListItemIcon><LocalLibraryIcon /></ListItemIcon>
            <ListItemText primary="Book Lending" />
            <ArrowDropDownIcon />
          </ListItemButton>
          <List style={{ display: openSubmenu === "bookLending" ? "block" : "none" }}>
            <Link to="/issue-book" className="sidebar-link">
              <ListItemButton
                selected={active === "studentPage"}
                onClick={() => handleOptionClick("studentPage")}
              >
                <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                <ListItemText primary="Student Page" />
              </ListItemButton>
            </Link>
            <Link to="/assign-borrower" className="sidebar-link">
              <ListItemButton
                selected={active === "bookPage"}
                onClick={() => handleOptionClick("bookPage")}
              >
                <ListItemIcon><MenuBookIcon /></ListItemIcon>
                <ListItemText primary="Book Page" />
              </ListItemButton>
            </Link>
          </List>
          <ListItemButton onClick={() => toggleSubmenu("transactionHistory")}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="Transaction History" />
            <ArrowDropDownIcon />
          </ListItemButton>
          <List style={{ display: openSubmenu === "transactionHistory" ? "block" : "none" }}>
            <Link to="/Student-wise-history" className="sidebar-link">
              <ListItemButton
                selected={active === "studentHistoryPage"}
                onClick={() => handleOptionClick("studentHistoryPage")}
              >
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                <ListItemText primary="Student List" />
              </ListItemButton>
            </Link>
          </List>
        </List>
        <Divider />
        <div className="sidebar-logout" onClick={handleLogout}>
          <ListItemButton sx={{ color: "inherit" }}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </div>
      </Drawer>
      <Main open={sidebarOpen}>
        <DrawerHeader />
        {/* Main content area */}
      </Main>
      {!sidebarOpen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setSidebarOpen(true)}
          sx={{
            position: "fixed",
            top: theme.spacing(2),
            left: theme.spacing(2),
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Sidebar;
