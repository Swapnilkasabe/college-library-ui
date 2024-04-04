import React, { useState } from "react";
import { TextField, Button, Paper, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { passwordResetValidation } from "../../../utilities/formValidation";
import "./PasswordReset.css";

const initialValues = {newPassword: "", confirmNewPassword: ""}

const PasswordReset = () => {
 const [data, setData] = useState(initialValues);
 const [dataErrors, setDataErrors] = useState({});
 const [passwordChange, setPasswordChange] = useState(false);

 const navigate = useNavigate();

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setData((prevData) => ({ ...prevData, [name]: value }));
}

const handleToggle = () => {
  navigate("/login");
};

const handleFocus = (e)=>{
  const {name} = e.target;
setDataErrors((prevData)=>({...prevData, [name]:""}))

}

const handleBlur = (e)=>{
  const {name} = e.target;
  const errors = passwordResetValidation({...data, [name]:data[name]});
  setDataErrors((prevData)=>({...prevData, [name]:errors[name]}))
}

const handleSubmit = (e)=>{
e.preventDefault();
const errors = passwordResetValidation(data);
setDataErrors(errors);
if (Object.keys(errors).length===0) {
  setPasswordChange(true);
}

}

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="password-reset-container">  
      <Grid item xs={12} sm={8} md={5} lg={4}>
    
      <Paper elevation={3} className="password-reset-paper">
      <Typography variant="h5" className="login-title">
         {!passwordChange ? "Reset Your Password" : "" }
          </Typography>  
          {!passwordChange ? (<form className="password-reset-form" onSubmit={handleSubmit}>
          <TextField
            name="newPassword"
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={data.newPassword}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={!!dataErrors.newPassword}
            helperText={dataErrors.newPassword}
          />
          <TextField
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={data.confirmNewPassword}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={!!dataErrors.confirmNewPassword}
            helperText={dataErrors.confirmNewPassword}
          />
          <Button
            variant="contained"
            color="primary"
            className="submit-button"
            type="submit"
          >
            Reset Password
          </Button>
        </form>) : 
        // If passwordChange is successful, displaying a success message
            <Box className="success-message">
           <Typography variant="body2" gutterBottom>
           You have successfully reset your password!

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
            </Box>}      
          
      </Paper>
      </Grid>
    </Grid>
  );
};

export default PasswordReset;
