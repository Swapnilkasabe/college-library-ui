import React from "react";
import { TextField, Button, Paper } from "@mui/material";
import "./PasswordReset.css";

const PasswordReset = () => {
 

  return (
    <div className="password-reset-container">
      <Paper elevation={3} className="password-reset-paper">
        <h2 className="password-reset-title">Reset Your Password</h2>
        <form className="password-reset-form">
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            type="submit"
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default PasswordReset;
