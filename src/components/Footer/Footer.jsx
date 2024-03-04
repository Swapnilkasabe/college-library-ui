import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './Footer.css'; 

function Footer() {
  return (
    <Grid container className="footer-container">
      <Grid item xs={12}>
        <Paper elevation={3} className="footer-content">
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Footer;
