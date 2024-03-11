import React, { useEffect, useState } from "react";
import { Modal, Button, TextField } from "@mui/material";

const AddStudentModal = ({ isOpen, onClose, onAdd }) => {
  // Initializing state variables with default values from the student object
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Resetting state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setId("");
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [isOpen]);

  // Handling add function
  const handleAdd = () => {
    const newStudent = {
      id,
      name,
      email,
      phone,
    };
    onAdd(newStudent);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-content">
        <h2>Add Student Details</h2>
        <form className="modal-form">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="modal-buttons">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add Student
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
