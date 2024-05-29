import { isEmptyString } from "./helper.js";

// Function to validate login form fields
export const loginValidation = (values) => {
  // Object to store errors
  const errors = { email: "", password: "" };
  let isError = false;

  // Regular expression to validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if email is provided
  if (isEmptyString(values.email)) {
    isError = true;
    errors.email = "Email is required";
    // Check if email format is valid
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Check if password is provided
  if (isEmptyString(values.password)) {
    isError = true;
    errors.password = "Password is required";
  }
  return { errors, isError };
};

// Function to validate signup form fields
export const signupValidation = (values) => {
  const errors = { username: "", email: "", password: "", confirmPassword: "" };
  let isError = false;
  // Regular expression to validate email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if username is provided
  if (isEmptyString(values.username)) {
    isError = true;
    errors.username = "Username is required";
  }

  // Check if email is provided
  if (isEmptyString(values.email)) {
    isError = true;
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Check if password is provided and meets length requirements
  if (isEmptyString(values.password)) {
    isError = true;
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed 10 characters";
  }

  // Check if confirmPassword matches password
  if (values.password !== values.confirmPassword) {
    isError = true;
    errors.confirmPassword = "Passwords do not match";
  }

  return { errors, isError };
};

// Function to validate password reset form fields
export const passwordResetValidation = (values) => {
  const errors = {
    newPassword: "",
    confirmNewPassword: "",
  };
  let isError = false;

  // Check if newPassword is provided and meets minimum length requirement
  if (isEmptyString(values.newPassword)) {
    isError = true;
    errors.newPassword = "New password is required";
  } else if (values.newPassword.length < 4) {
    isError = true;
    errors.newPassword = "New Password must be at least 4 characters long";
  }
  // Check if confirmNewPassword matches newPassword
  if (isEmptyString(values.confirmNewPassword)) {
    isError = true;
    errors.confirmNewPassword = "Confirm New Password is required";
  } else if (values.confirmNewPassword !== values.newPassword) {
    errors.confirmNewPassword = "Passwords do not match";
  }
  return { errors, isError };
};

// Function to validate student creation form fields
export const studentCreationValidation = (student) => {
  const errors = { name: "", email: "", studentId: "", phone: "" };
  let isError = false;

  if (isEmptyString(student.name)) {
    isError = true;
    errors.name = "Name is required";
  }

  if (isEmptyString(student.studentId)) {
    isError = true;
    errors.studentId = "Student ID is required";
  }

  if (isEmptyString(student.email)) {
    isError = true;
    errors.email = "Email is required";
  } else if (!isValidEmail(student.email)) {
    isError = true;
    errors.email = "Invalid email format";
  }

  if (isEmptyString(student.phoneNumber)) {
    isError = true;
    errors.phone = "Phone Number is required";
  }

  return { errors, isError };
};

// Function to validate student update form fields
export const studentUpdateValidation = (student) => {
  const errors = { name: "", email: "", studentId: "", phone: "" };
  let isError = false;

  if (isEmptyString(student.name)) {
    isError = true;
    errors.name = "Name is required";
  }

  if (isEmptyString(student.email)) {
    isError = true;
    errors.email = "Email is required";
  } else if (!isValidEmail(student.email)) {
    isError = true;
    errors.email = "Invalid email format";
  }

  if (isEmptyString(student.phoneNumber)) {
    isError = true;
    errors.phone = "Phone Number is required";
  }

  return { errors, isError };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate book creation form fields
export const bookCreationValidation = (book) => {
  const errors = { title: "", author: "", description: "", bookId: "" };
  let isError = false;

  if (isEmptyString(book.title)) {
    isError = true;
    errors.title = "Title is required";
  }

  if (isEmptyString(book.author)) {
    isError = true;
    errors.author = "Author is required";
  }

  if (isEmptyString(book.description)) {
    isError = true;
    errors.description = "Description is required";
  }

  if (isEmptyString(book.bookId)) {
    isError = true;
    errors.bookId = "Book ID is required";
  }

  return { errors, isError };
};

// Function to validate book update form fields
export const bookUpdateValidation = (book) => {
  const errors = { title: "", author: "", description: "" };
  let isError = false;

  if (isEmptyString(book.title)) {
    isError = true;
    errors.title = "Title is required";
  }

  if (isEmptyString(book.author)) {
    isError = true;
    errors.author = "Author is required";
  }

  if (isEmptyString(book.description)) {
    isError = true;
    errors.description = "Description is required";
  }

  return { errors, isError };
};
