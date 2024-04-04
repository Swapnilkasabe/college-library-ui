import React, { useEffect, useState } from "react";
import { Modal, Button, TextField, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { isEmptyString } from "../../utilities/helper";
import "./Modal.css";

export const DefaultData = {
  id: "",
  name: "",
  email: "",
  phone: "",
};

const AddStudentModal = ({ isOpen, onClose, onAdd, initialStudentData }) => {
  // Initializing state variables with default values from the DefaultData object
  const [studentData, setStudentData] = useState(DefaultData);

  // Handling add function
  const handleAdd = () => {
    onAdd(studentData);
    setStudentData(DefaultData);
    onClose();
  };

  // Handling onchange in input fields
  const handleOnChange = (key) => (e) => {
    e.preventDefault();
    const { value } = e.target;
    setStudentData((prevStudentData) => ({ ...prevStudentData, [key]: value }));
  };

  // Handling modal close action
  const onCloseHandle = () => {
    setStudentData(DefaultData);
    onClose();
  };

  // Effect to update form data when initial data changes
  useEffect(() => {
    if (!isEmptyString(initialStudentData.id)) {
      setStudentData(initialStudentData);
    }
  }, [isOpen, initialStudentData]);

  // Determining title whether it's an add or update operation
  const modeTitle = isEmptyString(initialStudentData.id) ? "Add" : "Update";

  if (!isOpen) {
    return <></>; // If modal is not open, return nothing
  }
  return (
    <Modal open={isOpen} onClose={onCloseHandle}>
      <Box className="modal-content">
        <Box className="modal-header">
          <h2>{modeTitle} Student</h2>
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
            />
          </Box>
          <Box>
            <TextField
              label="Student ID"
              value={studentData.id}
              onChange={handleOnChange("id")}
              className="input-field"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              label="Email"
              value={studentData.email}
              onChange={handleOnChange("email")}
              className="input-field"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              label="Phone"
              value={studentData.phone}
              onChange={handleOnChange("phone")}
              className="input-field"
              fullWidth
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

export default AddStudentModal;
