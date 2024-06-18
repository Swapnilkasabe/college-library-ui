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
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import Pagination from "./Pagination";
import PropTypes from "prop-types";
import "./GenericTable.css";

// Reusable component for displaying tabular data with customizable columns and actions
const GenericTable = ({
  data,
  columns,
  actions,
  limit,
  page,
  onPageChange,
}) => {
  // State for managing current page for pagination
  const [rowsPerPage, setRowsPerPage] = useState(limit);

  const handleRowsPerPageChange = (newLimit) => {
    setRowsPerPage(newLimit);
    onPageChange(1);
  };

  // Calculating start and end index of items to display based on current page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Slice the data array based on start and end index
  const slicedData = data ? data.slice(startIndex, endIndex) : [];

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper} className="generic-table-container">
        <Table aria-label="simple table" className="table-container">
          <TableHead>
            <TableRow>
              {/* Mapping over columns to render table headers */}
              {columns.map((column) => (
                <TableCell key={column.key} className="table-header">
                  {column.label}
                </TableCell>
              ))}
              {/* Actions column header */}
              {actions && (
                <TableCell className="table-header actions-header">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              // Mapping over slicedData to render table rows
              slicedData.map((row) => (
                <TableRow key={row._id}>
                  {" "}
                  {/* Mapping over columns to render table cells */}
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {/* Tooltip for truncated text */}
                      <Tooltip
                        title={
                          column.isNestedKey
                            ? row[column.key.split("$")[0]][
                                column.key.split("$")[1]
                              ]
                            : row[column.key]
                        }
                        arrow
                      >
                        {/* Truncated text */}
                        <span className="truncate-text">
                          {column.isNestedKey
                            ? row[column.key.split("$")[0]][
                                column.key.split("$")[1]
                              ]
                            : row[column.key]}
                        </span>
                      </Tooltip>
                    </TableCell>
                  ))}
                  {/* Actions column */}
                  {actions && (
                    <TableCell className="actions-cell">
                      {/* Mapping over actions to render action buttons */}
                      {actions.map((action, index) => (
                        <Tooltip key={`action-${index}`} title={action.tooltip}>
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
              // No data available row
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="no-data-cell"
                >
                  <Typography variant="body3" style={{ textAlign: "center" }}>
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Pagination
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Grid>
  );
};

// Defining the types for the props
GenericTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isNestedKey: PropTypes.bool,
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      tooltip: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ),
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default GenericTable;
