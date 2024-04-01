import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Add icon component
export const AddIconButton = () => <AddIcon />;

// Edit icon component
export const EditIconButton = () => (
  <EditIcon style={{ fontSize: 22, cursor: "pointer" }} />
);

// Delete icon component
export const DeleteIconButton = () => (
  <DeleteIcon style={{ fontSize: 22, cursor: "pointer", color: "#D11A2A" }} />
);
