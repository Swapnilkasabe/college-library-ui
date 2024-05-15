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
  Grid,
} from "@mui/material";
import "./GenericTable.css";

// Reusable component for displaying tabular data with customizable columns and actions
const GenericTable = ({ data, columns, actions }) => {
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper} className="generic-table-container">
        <Table aria-label="simple table" className="table-container">
          <TableHead>
            <TableRow>
              {/* Mapping over columns to render table headers */}
              {columns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
              {/* Actions column header */}
              {actions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              // Mapping over data to render table rows
              data?.map((row) => (
                <TableRow key={row.id || row.code}>
                  {/* Mapping over columns to render table cells */}
                  {columns.map((column) => (
                    <TableCell key={column.key}>{row[column.key]}</TableCell>
                  ))}
                  {actions && Array.isArray(actions) && actions.length > 0 && (
                    <TableCell className="actions-cell">
                      <Paper className="action-button" variant="contained">
                        {actions.map((action, index) => (
                          <Button
                            key={index}
                            onClick={() => action.handler(row)}
                          >
                            {action.icon}
                          </Button>
                        ))}
                      </Paper>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              // If no data is available
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
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
    </Grid>
  );
};

export default GenericTable;
