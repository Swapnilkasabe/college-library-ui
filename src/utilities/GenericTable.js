import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./GenericTable.css";

// Reusable component for displaying tabular data with customizable columns and actions
const GenericTable = ({ data, columns, actions }) => {
  return (
    <TableContainer component={Paper} className="generic-table-container">
      <Table aria-label="simple table" className="table-container">
        <TableHead>
          <TableRow>
            {/* Mapping over columns to render table headers */}
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
            {/* Actions column header */}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            // Mapping over data to render table rows
            data.map((row) => (
              <TableRow key={row.id || row.code}>
                {/* Mapping over columns to render table cells */}
                {columns.map((column) => (
                  <TableCell key={row[column.key]}>{row[column.key]}</TableCell>
                ))}
                {/* Actions column */}
                <TableCell className="actions-cell">
                  {actions
                    ? actions.map((action, index) => (
                        <Button
                          key={index}
                          className="action-button"
                          variant="contained"
                          onClick={() => action.handler(row)}
                        >
                          {action.label}
                        </Button>
                      ))
                    : null}
                </TableCell>
              </TableRow>
            ))
          ) : (
            // If no data is available
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                align="center"
                className="no-data-cell"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
