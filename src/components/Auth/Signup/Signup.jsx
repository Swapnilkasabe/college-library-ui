import React, { useState } from "react";
import { TextField, Button, Paper, FormHelperText, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupValidation } from "../../../utilities/formValidation";

import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const errors = signupValidation(formData);
    setFormErrors(errors);

    // If there are no errors, proceeding with signup
    if (Object.keys(errors).length === 0) {
      setRegistrationSuccess(true); 
      
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (e)=>{
    const {name} = e.target;
    setFormErrors((prevErros)=>({...prevErros, [name]:""}))
  }


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
                id="fullName"
                name="fullName"
                label="Full Name"
                variant="outlined"
                margin="normal"
                className="signup-field"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {formErrors.fullName && (
                <FormHelperText error>{formErrors.fullName}</FormHelperText>
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
                onClick={handleToggle}
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
