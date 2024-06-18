import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, MenuItem, IconButton, Typography, Menu } from "@mui/material";
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
  ArrowDropDown,
} from "@mui/icons-material";
import "./Pagination.css";

const Pagination = ({
  page,
  onPageChange,
  pageCount,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  // State to manage the menu
  const [menuAnchor, setMenuAnchor] = useState(null);

  // Function to open the menu
  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  // Function to close the menu
  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  // Function to handle rows per page change
  const handleRowsPerPageChange = (count) => {
    onRowsPerPageChange(count);
    handleCloseMenu();
  };

  return (
    <Box className="pagination-container">
      <Box className="pagination-left">
        <Typography variant="body2" className="pagination-info">
          Rows per page:
        </Typography>
        <IconButton
          aria-controls="rows-per-page-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          className="rows-per-page-button"
        >
          {rowsPerPage} <ArrowDropDown />
        </IconButton>
        <Menu
          id="rows-per-page-menu"
          menuAnchor={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
        >
          {[5, 10, 25, 50].map((count) => (
            <MenuItem
              key={count}
              onClick={() => handleRowsPerPageChange(count)}
            >
              {count}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box className="pagination-right">
        <Typography variant="body2" className="pagination-info">
          {`${page * rowsPerPage - rowsPerPage + 1}–${Math.min(
            page * rowsPerPage,
            pageCount || 0
          )} of ${pageCount || 0}`}
        </Typography>
        <IconButton
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className="pagination-button"
        >
          <FirstPage />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="pagination-button"
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(page + 1)}
          disabled={page === Math.ceil(pageCount / rowsPerPage)}
          className="pagination-button"
        >
          <NavigateNext />
        </IconButton>
        <IconButton
          onClick={() => onPageChange(Math.ceil(pageCount / rowsPerPage))}
          disabled={page === Math.ceil(pageCount / rowsPerPage)}
          className="pagination-button"
        >
          <LastPage />
        </IconButton>
      </Box>
    </Box>
  );
};

// Defining default props for Pagination component
Pagination.defaultProps = {
  page: 1,
  pageCount: 0,
  rowsPerPage: 5,
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
};

// Defining the types for the props for Pagination component
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;
