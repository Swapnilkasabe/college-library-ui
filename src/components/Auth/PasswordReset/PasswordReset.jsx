import React, { useState } from "react";
import { TextField, Button, Paper, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { passwordResetValidation } from "../../../utilities/formValidation";
import "./PasswordReset.css";
import { checkEmailExists, passwordReset } from "../../../services/user.service";
import useDebounce from "../../../hooks/useDebounce";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwords, setPasswords] = useState({ newPassword: "", confirmNewPassword: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const navigate = useNavigate();


  // Debounce email change 
  const debouncedHandleEmailChange = useDebounce((value) => {
    setEmail(value);
    setEmailError("");
  }, 500);

  // Debounce password change
  const debouncedHandlePasswordChange = useDebounce((value) => {
    setPasswords(value);
    setPasswordError("");
  }, 500);

  // Handle email input change
  const handleEmailChange = (e) => {
    debouncedHandleEmailChange(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    debouncedHandlePasswordChange({ ...passwords, [e.target.name]: e.target.value });
  };

   // Verifying email for password reset
  const verifyEmail = async () => {
    try {
      const response = await checkEmailExists({email});
      if (response.success && response.emailExists) {
        setEmailVerified(true);
      } else {
        if (response.error === "User not found") {
        }
        setEmailError("Email not found. Please enter a valid email.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setEmailError("An error occurred. Please try again later.");
    }
  };

  // Handle form submission for password reset
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isError } = passwordResetValidation(passwords);
    setPasswordError("");

    if (isError) {
      console.error("Validation error:", errors); 
      return;
    }
    
    try {
      const response = await passwordReset({ email, newPassword: passwords.newPassword });

      if (response.success) {
        setPasswordChanged(true);
      } else {
        setPasswordError(response.error || "An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError("An error occurred. Please try again later.");
    }
  }; 

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="password-reset-container"
    >
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Paper elevation={3} className="password-reset-paper">
          <Typography variant="h5" className="login-title">
            Reset Your Password
          </Typography>
          {!emailVerified ? (
            <form
              className="password-reset-form"
              onSubmit={(e) => {
                e.preventDefault();
                verifyEmail();
              }}
            >
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
              />
              <Button
                variant="contained"
                color="primary"
                className="submit-button"
                type="submit"
              >
                Verify Email
              </Button>
            </form>
          ) : !passwordChanged ? (
            <form className="password-reset-form" onSubmit={handleSubmit}>
              <TextField
                name="newPassword"
                label="New Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={passwords.confirmNewPassword}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
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
          ) : (
            <div className="success-message">
              <Typography variant="body2" gutterBottom>
                Password successfully changed!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="login-button"
                onClick={() => navigate("/login")}
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

export default PasswordReset;