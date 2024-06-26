import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TablePagination,
  TextField,
  Popover,
  MenuItem,
  Box,
  InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";
import { formatDate } from "../../utilities/helper";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./GenericTable.css";

const GenericTable = ({
  data = [],
  columns,
  actions,
  total,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  showFilters,
  addButton,
}) => {
  // State hooks for managing search term
  const [searchTerm, setSearchTerm] = useState("");
  // State hooks for managing anchor element for status filter popover
  const [anchorEl, setAnchorEl] = useState(null);
  // State hooks for managing selected status filter
  const [statusFilter, setStatusFilter] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle status filter change
  const handleStatusChange = (event, newStatus) => {
    setStatusFilter(newStatus);
    closePopover();
  };

  // Open popover for status filter selection
  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close status filter popover
  const closePopover = () => {
    setAnchorEl(null);
  };

  // Handle page change event
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage, rowsPerPage);
  };

  // Handle rows per page change event
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange(newRowsPerPage);
  };

  // Filter data based on search term and status filter
  const filteredData = data.filter((row) => {
    const matchesSearchTerm = columns.some((column) =>
      row[column.key]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const matchesStatusFilter = !statusFilter || row.status === statusFilter;

    return matchesSearchTerm && matchesStatusFilter;
  });

  // Calculate currently displayed data based on pagination
  const displayedData = filteredData.slice(
    page * rowsPerPage,
    Math.min((page + 1) * rowsPerPage, total)
  );

  return (
    <>
      <Box className="search-box-container">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextField
            placeholder="Search.."
            variant="standard"
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              sx: {
                backgroundColor: "transparent",
                borderRadius: 20,
                paddingLeft: 0,
                fontSize: "18px",
                fontFamily: "Arial, sans-serif",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    className="search-icon"
                    sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <ClearIcon
                    onClick={() => setSearchTerm("")}
                    sx={{
                      color: "rgba(0, 0, 0, 0.54)",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              sx: { fontSize: "0.875rem" },
            }}
            className="search-text-field"
          />
          {addButton && <Box>{addButton}</Box>}
        </Box>
        {showFilters && (
          <>
            <Box
              className="filter-box-container"
              sx={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
              onClick={openPopover}
            >
              <FilterListIcon className="filter-icon" />
              <Typography
                className="filter-text"
                sx={{ ml: 1, cursor: "pointer" }}
                variant="body2"
                color="textSecondary"
              >
                Filter Status
              </Typography>
            </Box>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={closePopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2 }}>
                <MenuItem onClick={(e) => handleStatusChange(e, "")}>
                  All
                </MenuItem>
                <MenuItem onClick={(e) => handleStatusChange(e, "issued")}>
                  Issued
                </MenuItem>
                <MenuItem onClick={(e) => handleStatusChange(e, "returned")}>
                  Returned
                </MenuItem>
              </Box>
            </Popover>
          </>
        )}
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{ maxHeight: 440 }}
          className="generic-table-container"
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            className="table-container"
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key} className="table-header">
                    {column.label}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="table-header actions-header">
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.length > 0 ? (
                displayedData.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = column.isNestedKey
                        ? row[column.key.split("$")[0]][
                            column.key.split("$")[1]
                          ]
                        : row[column.key];
                      let displayValue = value;
                      if (column.key === "dueDate") {
                        displayValue = formatDate(value);
                      }

                      return (
                        <TableCell key={column.key}>
                          <Tooltip title={displayValue} arrow>
                            <span className="truncate-text">
                              {column.format && typeof displayValue === "string"
                                ? column.format(displayValue)
                                : displayValue}
                            </span>
                          </Tooltip>
                        </TableCell>
                      );
                    })}
                    {actions && (
                      <TableCell className="actions-cell">
                        {actions.map((action, index) => (
                          <Tooltip
                            key={`action-${index}`}
                            title={action.tooltip}
                          >
                            <Button onClick={() => action.handler(row)}>
                              {action.icon}
                            </Button>
                          </Tooltip>
                        ))}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="no-data-cell"
                  >
                    <Typography variant="body2" style={{ textAlign: "center" }}>
                      No data available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 4]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="custom-pagination"
        />
      </Paper>
    </>
  );
};

GenericTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isNestedKey: PropTypes.bool,
      format: PropTypes.func,
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      tooltip: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ),
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  showFilters: PropTypes.bool,
  addButton: PropTypes.node,
};

export default GenericTable;
