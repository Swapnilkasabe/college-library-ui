import React, { useState } from "react";
import { TextField, Button, Paper, FormHelperText, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupValidation } from "../../../utilities/formValidation";

import "./Signup.css";
import { userSignup } from "../../../services/user.service";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

// Toggle between signup and login
  const handleToggle = () => {
    navigate("/login");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const {errors, isError} = signupValidation(formData);
    setFormErrors(true);
    if (isError) {
      console.error("Validation error:", errors); 
      return;
    }
      try {
           const response = await userSignup(formData);
          if (response.success) { 
            setRegistrationSuccess(true);
          } else {
            setFormErrors(response.error); 
          }}
         catch (error) {
        console.error('Signup failed:', error.message);
        setFormErrors("An error occurred. Please try again.");
      }}


  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle focus event
  const handleFocus = (e)=>{
    const {name} = e.target;
    setFormErrors((prevErros)=>({...prevErros, [name]:""}))
  }

// Handle blur event
  const handleBlur = (e)=>{
   const {name} = e.target;
   const errors = signupValidation({...formData, [name]:formData[name]})
   setFormErrors((prevErros) =>({...prevErros, [name]:errors[name]}))
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="signup-container"
    >
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Paper elevation={3} className="signup-paper">
          <Typography variant="h5" className="login-title">
          {!registrationSuccess ? "Signup" : ""}
          </Typography>
          {!registrationSuccess ? (
            // If registration is not successful, displaying the signup form
            <form className="signup-form" onSubmit={handleSubmit}>
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                margin="normal"
                className="signup-field"
                value={formData.username}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {formErrors.username && (
                <FormHelperText error>{formErrors.username}</FormHelperText>
              )}
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                className="signup-field"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {formErrors.email && (
                <FormHelperText error>{formErrors.email}</FormHelperText>
              )}
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                margin="normal"
                className="signup-field"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {formErrors.password && (
                <FormHelperText error>{formErrors.password}</FormHelperText>
              )}
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
                margin="normal"
                className="signup-field"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {formErrors.confirmPassword && (
                <FormHelperText error>
                  {formErrors.confirmPassword}
                </FormHelperText>
              )}
              <Button
                variant="contained"
                color="primary"
                className="submit-button"
                type="submit"
              >
                Signup
              </Button>
              <Typography className="toggle-link">
                Already have an account?{" "}
                <span className="login-link" onClick={handleToggle}>
                  Login ➜
                </span>
              </Typography>
            </form>
          ) : (
            // If registration is successful, displaying a success message
            <Box className="success-message">
           <Typography variant="body2" gutterBottom>
                You have successfully registered!
            </Typography>              
            <Typography variant="body2" gutterBottom>
              Please log in to continue.
            </Typography>                
            <Button
                variant="contained"
                color="primary"
                className="login-button"
                onClick={()=>setTimeout(handleToggle, 1000)}
              >
                Login
              </Button>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
