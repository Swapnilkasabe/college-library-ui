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
      throw new Error("Error creating student");
      return;
    }
    onAdd(studentData);
    setStudentData(DefaultData);
    onClose();
  };

  // Handle input change
  const handleOnChange = (key) => (e) => {
    e.preventDefault();
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
    if (!isEmptyString(initialStudentData.studentId)) {
      setStudentData(initialStudentData);
    }
  }, [isOpen, initialStudentData]);

  const modeTitle = isEmptyString(initialStudentData.studentId)
    ? "Add"
    : "Update";

  if (!isOpen) {
    return <></>;
  }
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
              helperText={errors.name}
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
              helperText={errors?.studentId}
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
              helperText={errors.email}
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
              helperText={errors.phone}
            />
          </Box>
          <div className="modal-buttons">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              {modeTitle} Student
            </Button>
            <Button onClick={onCloseHandle} variant="contained">
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentModal;
