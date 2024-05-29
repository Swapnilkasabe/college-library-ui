import React from "react";
import { Modal, Button, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Component for renewing or returning book based on actionType
const RenewReturnModal = ({ isOpen, onClose, onAction, actionType }) => {
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

export default RenewReturnModal;
