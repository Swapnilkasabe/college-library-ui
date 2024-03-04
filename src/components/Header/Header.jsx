import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {

  return (
    <AppBar position="static" className="custom-appbar">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="header-link"><LibraryBooksIcon/> College Library</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
