import React from "react";
import { Snackbar, Alert } from "@mui/material";

// Snackbar component to display notifications
const CustomSnackbar = ({ open, options, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={options?.autoClose}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={options?.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {options?.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
