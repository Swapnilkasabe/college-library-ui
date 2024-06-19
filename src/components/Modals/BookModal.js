import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { isEmptyString } from "../../utilities/helper";
import CloseIcon from "@mui/icons-material/Close";

import "./Modal.css";
import { bookCreationValidation } from "../../utilities/formValidation";

export const DefaultData = {
  title: "",
  author: "",
  description: "",
  bookId: "",
};

const AddBookModal = ({ isOpen, onClose, onAdd, initialBookData }) => {
  // Initializing state variables with default values from the DefaultData object
  const [bookData, setBookData] = useState(initialBookData);
  const [errors, setErrors] = useState({});

  // Handling add function
  const handleAdd = () => {
    const { errors, isError } = bookCreationValidation(bookData);
    if (isError) {
      setErrors(errors);
      return;
    }
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

  const isEditMode = !isEmptyString(initialBookData.bookId);

  // Effect to update form data when initial data changes
  useEffect(() => {
    if (!isEmptyString(initialBookData.bookId)) {
      setBookData(initialBookData);
    }
  }, [isOpen, initialBookData]);

  const modeTitle = isEmptyString(initialBookData.bookId) ? "Add" : "Update";
  const hasChanges =
    JSON.stringify(bookData) !== JSON.stringify(initialBookData);

  if (!isOpen) {
    return <></>;
  }
  return (
    <Modal open={isOpen} onClose={onCloseHandle}>
      <Box className="modal-content">
        <Box className="modal-header">
          <Typography variant="h5">{modeTitle} Book</Typography>
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
              error={!!errors.title}
              helperText={
                errors.title && (
                  <span className="modal-error">{errors.title}</span>
                )
              }
            />
          </Box>
          <Box>
            <TextField
              label="Author"
              value={bookData.author}
              onChange={handleOnChange("author")}
              className="input-field"
              fullWidth
              error={!!errors.author}
              helperText={
                errors.author && (
                  <span className="modal-error">{errors.author}</span>
                )
              }
            />
          </Box>
          <Box>
            <TextField
              label="Description"
              value={bookData.description}
              onChange={handleOnChange("description")}
              className="input-field"
              fullWidth
              error={!!errors.description}
              helperText={
                errors.description && (
                  <span className="modal-error">{errors.description}</span>
                )
              }
            />
          </Box>
          <Box>
            <TextField
              label="ID"
              value={bookData.bookId}
              onChange={handleOnChange("bookId")}
              className="input-field"
              fullWidth
              error={!!errors.bookId}
              helperText={
                errors.bookId && (
                  <span className="modal-error">{errors.bookId}</span>
                )
              }
              disabled={isEditMode}
            />
          </Box>
          <div className="modal-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={!hasChanges}
            >
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
