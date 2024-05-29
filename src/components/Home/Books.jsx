import { Typography, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 


const Books = ({numBooks}) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5">{numBooks}</Typography>
        <Typography variant="subtitle1" style={{ marginLeft: 5 }}>Books</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="Assets/book.png" alt="Book" style={{ width: 50, height: 50, marginRight: 10 }} />
        <IconButton aria-label="more info" style={{ padding: 0, marginRight: 5 }}>
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption">More Info</Typography>
      </div>
    </div>
  );
};

export default Books;
