import React, { useEffect, useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
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
      <div className="modal-content">
        <h2>{modeTitle} Student Details</h2>
        <form className="modal-form">
          <TextField
            label="Name"
            value={studentData.name}
            onChange={handleOnChange("name")}
          />
          <TextField
            label="Student ID"
            value={studentData.id}
            onChange={handleOnChange("id")}
          />
          <TextField
            label="Email"
            value={studentData.email}
            onChange={handleOnChange("email")}
          />
          <TextField
            label="Phone"
            value={studentData.phone}
            onChange={handleOnChange("phone")}
          />

          <div className="modal-buttons">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              {modeTitle} Student
            </Button>
            <Button onClick={onClose} variant="contained">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddStudentModal;
