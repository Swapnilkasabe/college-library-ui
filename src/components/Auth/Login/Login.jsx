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
import { userLogin } from "../../../services/user.service";
import localStorageService from "../../../services/localStorageService";

const Login = () => {
  const { setIsLogin } = useAppContext();
  // State for form data
  const [formData, setFormData] = useState({ email: "", password: "" });
  // State for form errors
  const [formErrors, setFormErrors] = useState({});
  // State for login errors
  const [loginError, setLoginError] = useState(""); 
  // Access state from context for displaying notification
  const { notificationHandler } = useAppContext();

  const navigate = useNavigate();

   // Redirect to signup page
  const handleToggle = () => {
    navigate("/signup");
  };

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

    // Form submission handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isError } = loginValidation(formData);
    setFormErrors(errors);
    if (isError) {
      console.error("Validation error:", errors); 
      return;
    }
    try {
      const response = await userLogin(formData);
      if (response?.success) {
        localStorageService.set('token', response.token);
        setIsLogin(true);
        notificationHandler(true, "Logged in successfully", "success");
        navigate("/", {replace: true} );
      } else {
        notificationHandler(true, response?.error, "error");
        setLoginError(response.error || "Incorrect email or password."); 
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setLoginError("An error occurred. Please try again.");
      notificationHandler(true, error?.message, "error");

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
            {loginError && (
              <Typography color="error">{loginError}</Typography>
            )}
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
              helperText={formErrors.email && (
                <span className="error-message">{formErrors.email}</span>
              )}
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
              helperText={formErrors.password && (
                <span className="error-message">{formErrors.password}</span>
              )}
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
