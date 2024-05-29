import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useAppContext } from "../../contexts/AppContext.Provider";
import localStorageService from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setIsLogin } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data from backend upon component mount
    // Example: fetchUserProfile();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading indicator
    // Simulate API call for updating user profile
    setTimeout(() => {
      setLoading(false); // Stop loading indicator
      setEditMode(false); // Disable edit mode
      setError(""); // Clear any previous error
      // Update user profile data in state or fetch updated data from backend
      // Example: updateUserProfile(formData);
    }, 1500); // Simulate 1.5 second delay (replace with actual API call)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setFormData({}); // Clear form data
      setError(""); // Clear any previous error
    }
  };

  const handleLogout = () => {
    try {
      localStorageService.clear();
      setIsLogin(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Redirect to login if user is not logged in
  if (!user) {
    return navigate("/login");
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          {loading ? ( // Show loading indicator if data is being loaded
            <Grid container justifyContent="center" alignItems="center">
              <CircularProgress />
            </Grid>
          ) : (
            <>
              {error && (
                <Typography variant="body1" color="error" gutterBottom>
                  {error}
                </Typography>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Username: {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Email: {user.email}</Typography>
                </Grid>
                {editMode && (
                  <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        name="username"
                        label="Username"
                        value={formData.username || user.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        name="email"
                        label="Email"
                        value={formData.email || user.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <Button type="submit" variant="contained" fullWidth>
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        onClick={toggleEditMode}
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </form>
                  </Grid>
                )}
                {!editMode && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={toggleEditMode}
                      fullWidth
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                )}
              </Grid>
            </>
          )}
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Button variant="contained" onClick={handleLogout} fullWidth>
              Logout
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
