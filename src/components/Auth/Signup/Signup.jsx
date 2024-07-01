import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupValidation } from "../../../utilities/formValidation";
import { userSignup } from "../../../services/user.service";
import "./Signup.css";
import { useAppContext } from "../../../contexts/AppContext.Provider";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
     // Access state from context for displaying notification
  const { notificationHandler } = useAppContext();
  const navigate = useNavigate();
  // Toggle between signup and login
  const handleToggle = () => {
    navigate("/login");
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { errors, isError } = signupValidation(formData);
    setFormErrors(errors);
    if (isError) {
      console.error("Validation error:", errors);
      return;
    }
    try {
      const response = await userSignup(formData);
      if (response.success) {
        notificationHandler(true, response?.message, "success");
        setRegistrationSuccess(true);
      } else {
        notificationHandler(true, response?.error, "error");
        setFormErrors(response.error);
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
      notificationHandler(true, error?.message, "error");
      setFormErrors("An error occurred. Please try again.");
    }
  };
// Handle input change  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const errors = signupValidation({ ...formData, [name]: formData[name] });
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: errors[name] }));
  };

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
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                margin="normal"
                className="signup-field"
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                error={!!formErrors.firstName}
                helperText={
                  formErrors.firstName && (
                    <span className="error-message">{formErrors.firstName}</span>
                  )
                }
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                margin="normal"
                className="signup-field"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                error={!!formErrors.lastName}
                helperText={
                  formErrors.lastName && (
                    <span className="error-message">{formErrors.lastName}</span>
                  )
                }
              />
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
                error={!!formErrors.email}
                helperText={
                  formErrors.email && (
                    <span className="error-message">{formErrors.email}</span>
                  )
                }
              />
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
                error={!!formErrors.password}
                helperText={
                  formErrors.password && (
                    <span className="error-message">{formErrors.password}</span>
                  )
                }
              />
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
                error={!!formErrors.confirmPassword}
                helperText={
                  formErrors.confirmPassword && (
                    <span className="error-message">{formErrors.confirmPassword}</span>
                  )
                }
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className="submit-button"
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
            <div className="success-message">
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
                onClick={() => setTimeout(handleToggle, 1000)}
              >
                Login
              </Button>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
