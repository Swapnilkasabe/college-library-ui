import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Box, IconButton } from "@mui/material";
import { isEmptyString } from "../../utilities/helper";
import CloseIcon from "@mui/icons-material/Close";

import "./Modal.css";

export const DefaultData = {
  title: "",
  author: "",
  description: "",
  id: "",
};

const AddBookModal = ({ isOpen, onClose, onAdd, initialBookData }) => {
  // Initializing state variables with default values from the DefaultData object
  const [bookData, setBookData] = useState(DefaultData);

  // Handling add function
  const handleAdd = () => {
    onAdd(bookData);
    setBookData(DefaultData);
    onClose();
  };

  // Handling onchange in input fields
  const handleOnChange = (key) => (e) => {
    e.preventDefault();
    const { value } = e.target;
    setBookData((prevStudentData) => ({ ...prevStudentData, [key]: value }));
  };

  // Handling modal close action
  const onCloseHandle = () => {
    setBookData(DefaultData);
    onClose();
  };

  // Effect to update form data when initial data changes
  useEffect(() => {
    if (!isEmptyString(initialBookData.id)) {
      setBookData(initialBookData);
    }
  }, [isOpen, initialBookData]);

  // Determining title whether it's an add or update operation
  const modeTitle = isEmptyString(initialBookData.id) ? "Add" : "Update";
  if (!isOpen) {
    return <></>; // If modal is not open, return nothing
  }
  return (
    <Modal open={isOpen} onClose={onCloseHandle}>
      <Box className="modal-content">
        <Box className="modal-header">
          <h2>{modeTitle} Book</h2>
          <IconButton onClick={onCloseHandle} className="close-icon">
            <CloseIcon />
          </IconButton>
        </Box>
        <form className="modal-form">
          <Box>
            <TextField
              label="Title"
              value={bookData.title}
              onChange={handleOnChange("title")}
              className="input-field"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              label="Author"
              value={bookData.author}
              onChange={handleOnChange("author")}
              className="input-field"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              label="Description"
              value={bookData.description}
              onChange={handleOnChange("description")}
              className="input-field"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              label="ID"
              value={bookData.id}
              onChange={handleOnChange("id")}
              className="input-field"
              fullWidth
            />
          </Box>
          <div className="modal-buttons">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              {modeTitle} Book
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

export default AddBookModal;
