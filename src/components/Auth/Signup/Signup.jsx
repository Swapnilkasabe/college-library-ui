import React from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
const navigate = useNavigate();
  const handleToggle = () => {
    navigate('/login');
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  };

  return (
    <div className="signup-container">
      <Paper elevation={3} className="signup-paper">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            margin="normal"
            className="signup-field"
          ></TextField>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            className="signup-field"
          ></TextField>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            className="signup-field"
          ></TextField>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            margin="normal"
            className="signup-field"
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            type="submit"
          >
            Signup
          </Button>
          <Button
            color="secondary"
            className="toggle-button"
            onClick={handleToggle}
          >
            Switch to Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Signup;
