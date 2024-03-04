import React, { useState } from 'react';
import { Button, Modal, TextField, Grid, Typography, Container } from '@mui/material';

const AddStudentModal = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    email: '',
    phoneNumber: '',
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform validation and submit the form
    onAdd(formData);
    closeModal();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={openModal}>Add Student</Button>
      <Modal open={isOpen} onClose={closeModal}>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom>
            Add Student
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Student Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Student ID Number"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Student Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Student Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={closeModal}>Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="contained" color="primary">Add</Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default AddStudentModal;
