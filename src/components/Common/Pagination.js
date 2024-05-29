import React from "react";
import PropTypes from "prop-types";
import { Box, Pagination as MuiPagination } from "@mui/material";
import "./Pagination.css";

// Pagination component for navigating pages
const Pagination = ({ page, onPageChange, pageCount }) => (
  <Box className="pagination-container">
    <MuiPagination
      count={pageCount}
      page={page}
      onChange={(event, value) => onPageChange(value)}
      color="primary"
      size="small"
    />
  </Box>
);

// Defining the types for the props
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default Pagination;
