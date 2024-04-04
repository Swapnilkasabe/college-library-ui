// Function to validate login form fields
export const loginValidation = (values) => {
  const errors = {};

  // Regular expression to validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if email is provided
  if (!values.email.trim()) {
    errors.email = "Email is required";
    // Check if email format is valid
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Check if password is provided and meets minimum length requirement
  if (!values.password.trim()) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }
  return errors;
};

// Function to validate signup form fields
export const signupValidation = (values) => {
  const errors = {};

  // Regular expression to validate email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if fullName is provided
  if (!values.fullName.trim()) {
    errors.fullName = "Full Name is required";
  }

  // Check if email is provided
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Check if password is provided and meets length requirements
  if (!values.password.trim()) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed 10 characters";
  }

  // Check if confirmPassword matches password
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

// Function to validate password reset form fields
export const passwordResetValidation = (values) => {
  const errors = {};

  // Check if newPassword is provided and meets minimum length requirement
  if (!values.newPassword.trim()) {
    errors.newPassword = "New password is required";
  } else if (values.newPassword.length < 4) {
    errors.newPassword = "New Password must be at least 4 characters long";
  }
  // Check if confirmNewPassword matches newPassword
  if (!values.confirmNewPassword.trim()) {
    errors.confirmNewPassword = "Confirm New Password is required";
  } else if (values.confirmNewPassword !== values.newPassword) {
    errors.confirmNewPassword = "Passwords do not match";
  }
  return errors;
};
