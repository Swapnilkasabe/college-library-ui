import React, { useEffect, useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import "./EditStudentModal.css";

const EditStudentModal = ({ isOpen, onClose, student, onUpdate }) => {
  // Initializing state variables with default values from the student object
  const [updatedName, setUpdatedName] = useState(student?.name || "");
  const [updatedEmail, setUpdatedEmail] = useState(student?.email || "");
  const [updatedPhone, setUpdatedPhone] = useState(student?.phone || "");

  // Updating state variables when the student prop changes
  useEffect(() => {
    setUpdatedName(student?.name || "");
    setUpdatedEmail(student?.email || "");
    setUpdatedPhone(student?.phone || "");
  }, [student]);

  // Handling update function
  const handleUpdate = () => {
    onUpdate({
      id: student.id,
      name: updatedName,
      email: updatedEmail,
      phone: updatedPhone,
    });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-content">
        <h2>Edit Student Details</h2>
        <form className="modal-form">
          <TextField
            label="Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <TextField
            label="Email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            value={updatedPhone}
            onChange={(e) => setUpdatedPhone(e.target.value)}
          />
          <TextField label="ID" value={student?.id || ""} disabled />

          <div className="modal-buttons">
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
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

export default EditStudentModal;
