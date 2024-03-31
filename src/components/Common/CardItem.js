import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "./CardItem.css";

const CardItem = ({ data, columns, image }) => {
  // Check if name column exists in columns array to determine if it's a student card or not
  const isStudent = columns.some((column) => column.key === "name");
  // Determine the primary column name and label based on whether it's a student card or not
  const primaryColumnName = isStudent ? "name" : "title";
  const primaryColumnLabel = isStudent ? "Name" : "Title";

  // Find the primary column object from columns array
  const primaryColumn = columns.find(
    (column) => column.key === primaryColumnName
  );
  // Filter the primary column from columns array
  const otherColumns = columns.filter(
    (column) => column.key !== primaryColumnName
  );

  return (
    <Card variant="outlined" className="card-container">
      <CardContent className="card-content">
        {image && (
          <Box className="card-image">
            <img src={image} alt="" />
          </Box>
        )}
        <Box className="card-details">
          <Typography
            key={primaryColumn.key}
            variant="body2"
            className="card-name-item"
          >
            {primaryColumnLabel}: {data[primaryColumn.key]}
          </Typography>
          {otherColumns.map((column) => (
            <Typography key={column.key} className="card-text-item">
              {column.label}: {data[column.key]}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardItem;
