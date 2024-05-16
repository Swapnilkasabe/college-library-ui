import React, { useState } from 'react';
import { useAppContext } from '../../../contexts/AppContext.Provider'; 
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import localStorageService from '../../../services/localStorageService';

const Logout = () => {
    const { setIsLogin } = useAppContext();
    const [logoutError, setLogoutError] = useState(""); 
    const navigate = useNavigate();

    // Function for logout
    const handleLogout = () => {
        try {
            const response = localStorageService.clear();
            setIsLogin(false);
            navigate("/login", {replace:true});
        } catch (error) {
            setLogoutError("An error occurred. Please try again.");
            console.error("Error logging out:", error);
        }
    }

    return (
        <>
            {logoutError && <Typography variant="body1" color="error">{logoutError}</Typography>}
            <Link to="/login" className="sidebar-link" onClick={handleLogout}>
                <Typography variant="body1" component="p" className="dashboard-option">
                    <ExitToAppIcon className="dashboard-option-icon" /> Logout
                </Typography>
            </Link>
        </>
    );
};

export default Logout;
