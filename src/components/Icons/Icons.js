import React from "react";
import { Add, Delete, Edit } from "@mui/icons-material";

const IconButton = ({ IconComponent, className, ...rest }) => (
  <IconComponent className={className} {...rest} />
);

export const AddIconButton = ({ className = "addIcon", ...rest }) => (
  <IconButton IconComponent={Add} className={className} {...rest} />
);

export const EditIconButton = ({ className = "editIcon", ...rest }) => (
  <IconButton IconComponent={Edit} className={className} {...rest} />
);

export const DeleteIconButton = ({ className = "deleteIcon", ...rest }) => (
  <IconButton IconComponent={Delete} className={className} {...rest} />
);
