import React, { useEffect } from "react";
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
} from "@mui/material";
import PropTypes from "prop-types";
import { formatDate } from "../../utilities/helper";
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
}) => {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange(newRowsPerPage);
  };

  const displayedData = data.slice(
    page * rowsPerPage,
    Math.min((page + 1) * rowsPerPage, total)
  );

  return (
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
              {/* Mapping over columns to render table headers */}
              {columns.map((column) => (
                <TableCell key={column.key} className="table-header">
                  {column.label}
                </TableCell>
              ))}
              {/* Action column header */}
              {actions && (
                <TableCell className="table-header actions-header">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapping over displayedData to render table rows */}
            {displayedData && displayedData.length > 0 ? (
              displayedData.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {/* Mapping over columns to render table cells */}
                  {columns.map((column) => {
                    const value = column.isNestedKey
                      ? row[column.key.split("$")[0]][column.key.split("$")[1]]
                      : row[column.key];
                    let displayValue = value;
                    if (column.key === "dueDate") {
                      {
                        displayValue = formatDate(value);
                      }
                    }

                    return (
                      <TableCell key={column.key}>
                        <Tooltip title={displayValue} arrow>
                          {/* Truncated text */}
                          <span className="truncate-text">
                            {column.format && typeof displayValue === "string"
                              ? column.format(displayValue)
                              : displayValue}
                          </span>
                        </Tooltip>
                      </TableCell>
                    );
                  })}
                  {/* Actions column */}
                  {actions && (
                    <TableCell className="actions-cell">
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
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
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
};

export default GenericTable;
