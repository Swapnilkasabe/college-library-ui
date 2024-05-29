import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { isEmptyString } from "../../utilities/helper";
import "./Modal.css";
import { studentCreationValidation } from "../../utilities/formValidation";

export const DefaultData = {
  studentId: "",
  name: "",
  email: "",
  phoneNumber: "",
};

const StudentModal = ({ isOpen, onClose, onAdd, initialStudentData }) => {
  const [studentData, setStudentData] = useState(initialStudentData);
  const [errors, setErrors] = useState({});

  // Handle add student
  const handleAdd = () => {
    const { errors, isError } = studentCreationValidation(studentData);
    if (isError) {
      setErrors(errors);
      return;
    }
    onAdd(studentData);
    setStudentData(DefaultData);
    onClose();
  };

  // Handle input change
  const handleOnChange = (key) => (e) => {
    const { value } = e.target;
    setStudentData((prevStudentData) => ({ ...prevStudentData, [key]: value }));
  };

  // Handle onClose change
  const onCloseHandle = () => {
    setStudentData(DefaultData);
    setErrors({});
    onClose();
  };

  const isEditMode = !isEmptyString(initialStudentData.studentId);

  useEffect(() => {
    if (isEditMode) {
      setStudentData(initialStudentData);
    }
  }, [isOpen, initialStudentData]);

  const modeTitle = isEditMode ? "Update" : "Add";

  return (
    <Modal open={isOpen} onClose={onCloseHandle}>
      <Box className="modal-content">
        <Box className="modal-header">
          <Typography variant="h5">{modeTitle} Student</Typography>
          <IconButton onClick={onCloseHandle} className="close-icon">
            <CloseIcon />
          </IconButton>
        </Box>
        <form className="modal-form">
          <Box>
            <TextField
              label="Name"
              value={studentData.name}
              onChange={handleOnChange("name")}
              className="input-field"
              fullWidth
              error={!!errors.name}
              helperText={
                errors.name && (
                  <span className="modal-error">{errors.name}</span>
                )
              }
            />
          </Box>
          <Box>
            <TextField
              label="Student ID"
              value={studentData.studentId}
              onChange={handleOnChange("studentId")}
              className="input-field"
              fullWidth
              error={!!errors?.studentId}
              helperText={
                errors.studentId && (
                  <span className="modal-error">{errors.studentId}</span>
                )
              }
              disabled={isEditMode}
            />
          </Box>
          <Box>
            <TextField
              label="Email"
              value={studentData.email}
              onChange={handleOnChange("email")}
              className="input-field"
              fullWidth
              error={!!errors.email}
              helperText={
                errors.email && (
                  <span className="modal-error">{errors.email}</span>
                )
              }
            />
          </Box>
          <Box>
            <TextField
              label="Phone"
              value={studentData.phoneNumber}
              onChange={handleOnChange("phoneNumber")}
              className="input-field"
              fullWidth
              error={!!errors.phone}
              helperText={
                errors.phone && (
                  <span className="modal-error">{errors.phone}</span>
                )
              }
            />
          </Box>
          <Box className="modal-buttons">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              {modeTitle} Student
            </Button>
            <Button
              onClick={onCloseHandle}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentModal;
