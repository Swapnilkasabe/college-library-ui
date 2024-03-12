import React from "react";
import { TextField, Button, Link, Paper } from "@mui/material";
import {useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContext.Provider";
import "./Login.css";

const Login = () => {
  const {setIsLogin} = useAppContext();

  const navigate = useNavigate();
  const handleToggle = () => {
    navigate('/signup');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLogin(true);
    navigate('/');
  };

  return (
    <div className="login-container">
      <Paper elevation={3} className="login-paper">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            className="input-field"
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            className="input-field"
          />
          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            type="submit"
          >
            Login
          </Button>
          <Link href="/reset/:token" className="forgot-password">
            Forgot Password?
          </Link>
          <Button
            color="secondary"
            className="toggle-button"
            onClick={handleToggle}
          >
            Switch to Signup
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
