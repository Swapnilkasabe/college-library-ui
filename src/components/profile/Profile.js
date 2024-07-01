import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Avatar,
  Button,
} from "@mui/material";
import { useAppContext } from "../../contexts/AppContext.Provider";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../../services/user.service";
import "./Profile.css";

// Default user data for initial rendering
const defaultData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
};

const Profile = () => {
  // Access state from context
  const { isLogin } = useAppContext();
  // State to manage user data
  const [user, setUser] = useState(null);
  // State to manage loading
  const [loading, setLoading] = useState(true);

  // Hook to navigate through pages
  const navigate = useNavigate();

  // Effect hook to fetch user details when component mounts
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      fetchUserDetails()
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [isLogin, navigate]);

  // Function to handle back button click
  const handleBack = () => {
    navigate("/");
  };

  // Render loading spinner while data is being fetched
  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="profile-container"
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="profile-container"
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} className="profile-paper">
          <Avatar
            alt="User Avatar"
            src="Assets/avatar.jpg"
            className="profile-avatar"
          />
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          <Typography className="profile-text">
            First Name: {user ? user.firstName : defaultData.firstName}
          </Typography>
          <Typography className="profile-text">
            Last Name: {user ? user.lastName : defaultData.lastName}
          </Typography>
          <Typography className="profile-text">
            Email: {user ? user.email : defaultData.email}
          </Typography>
          <Button
            variant="contained"
            className="profile-button back-button"
            onClick={handleBack}
          >
            Dashboard
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
