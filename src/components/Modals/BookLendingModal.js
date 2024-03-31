import React from "react";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import "./Modal.css";

const ModalDialog = ({ isOpen, onClose }) => {
  const handleCloseModal = () => {
    onClose();
  };

  const onCloseHandle = () => {
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box className="modal-content">
        <Box className="modal-header">
          <h2>Edit Book</h2>
          <IconButton onClick={onCloseHandle} className="close-icon">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" component="p" className="book-info">
          <LibraryBooksIcon className="book-icon" />
          <span>Book Name:</span>
        </Typography>
        <Typography variant="body1" component="p" className="book-info">
          <DateRangeIcon className="book-icon" />
          <span>Borrowed Date:</span>
        </Typography>
        <div className="modal-buttons">
          <Button variant="contained" color="primary">
            Renew
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDialog;
