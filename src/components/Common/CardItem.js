import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "./CardItem.css";

const CardItem = ({ data, columns, image, issueBookBtn, children }) => {
  // Determine primary column based on columns array
  const primaryColumn = columns[0];
  const otherColumns = columns.slice(1);

  return (
    <Card variant="outlined" className="card-container">
      <CardContent className="card-content">
        {image && (
          <Box className="card-image">
            <img src={image} alt={data[primaryColumn.key]} />
          </Box>
        )}
        <Box className="card-details">
          {/* Display primary column */}
          <Typography variant="h5" className="card-name-item">
            {data[primaryColumn.key]}
          </Typography>
          {/* Display other columns */}
          {otherColumns.map((column) => (
            <Typography
              key={column.key}
              variant="body1"
              className="card-text-item"
            >
              <strong>{column.label}:</strong> {data[column.key]}
            </Typography>
          ))}
          {issueBookBtn && (
            <Box className="issue-book-btn-container">{issueBookBtn}</Box>
          )}
        </Box>
      </CardContent>
      {children && <Box className="card-action">{children}</Box>}
    </Card>
  );
};
// Defining the types for the props
CardItem.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string,
  issueBookBtn: PropTypes.node,
  children: PropTypes.node,
};

export default CardItem;
