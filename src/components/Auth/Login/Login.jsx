import React, { useState } from "react";
import {
  TextField,
  Button,
  Link,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContext.Provider";
import { loginValidation } from "../../../utilities/formValidation";
import "./Login.css";

const Login = () => {
  const { setIsLogin } = useAppContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleToggle = () => {
    navigate("/signup");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = loginValidation(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLogin(true);
      navigate("/");
    }
  };

  const handleFocus = (e)=>{
  const {name} = e.target;
  setFormErrors((prevErrors)=>({...prevErrors, [name]:""}))
  }

  const handleBlur = (e)=>{
    const {name} = e.target;
    const errors = loginValidation({...formData, [name]:formData[name]})
    setFormErrors((prevErrors)=>({...prevErrors, [name]:errors[name]}))

  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="login-container"
    >
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Paper elevation={3} className="login-paper">
          <Typography variant="h5" className="login-title">
            Login
          </Typography>
          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              className="input-field"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
              fullWidth
              className="input-field"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              className="login-button"
            >
              Login
            </Button>
            <Link href="/reset/:token" className="forgot-password">
              Forgot Password?
            </Link>
            <Typography className="toggle-link">
              Don't have an account?{" "}
              <span className="signup-link" onClick={handleToggle}>
                Sign up ➜
              </span>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
