import React from "react";
import { Modal, Button, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import "../Modals/Modal.css";

const RenewReturnModal = ({
  isOpen,
  onClose,
  onAction,
  actionType,
  bookDetails,
}) => {
  if (!bookDetails) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="modal-content">
        <Box className="modal-header">
          <Typography variant="h6">
            {actionType === "renew" ? "Renew Book" : "Return Book"}
          </Typography>
          <IconButton onClick={onClose} className="close-icon close-button">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="modal-body">
          <Typography variant="body1">
            <strong>Title:</strong> {bookDetails.title || ""}
          </Typography>
          <Typography variant="body1">
            <strong>Author:</strong> {bookDetails.author || ""}
          </Typography>
          <Typography variant="body1">
            <strong>Due Date:</strong> {bookDetails.dueDate || ""}
          </Typography>
        </Box>
        <Box className="modal-buttons">
          <Button
            variant="contained"
            className="action-button"
            onClick={onAction}
          >
            {actionType === "renew" ? "Renew Book" : "Return Book"}
          </Button>
          <Button
            variant="contained"
            className="cancel-button"
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Define PropTypes
RenewReturnModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(["renew", "return"]).isRequired,
  bookDetails: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    dueDate: PropTypes.string,
  }),
};

export default RenewReturnModal;
