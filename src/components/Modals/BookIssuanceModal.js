import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Modal,
  FormControl,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { getAllBooks, updateBook } from "../../services/book.service";
import CloseIcon from "@mui/icons-material/Close";
import { createLending } from "../../services/bookTransaction.service";
import { useAppContext } from "../../contexts/AppContext.Provider";
import { getAllStudents } from "../../services/student.service";
import "./Modal.css";

// Component for issuing books
const BookIssuanceModal = ({
  isOpen,
  onClose,
  mode,
  selectedBook,
  selectedStudent,
  onBookIssued,
  selectedStudentName,
  selectedBookTitle,
}) => {
  const { notificationHandler } = useAppContext();
  // State to store the list of books or students
  const [list, setList] = useState([]);
  // State to store the selected book or student
  const [selectedItem, setSelectedItem] = useState(null);
  // State to store the book or student item details
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  // Fetching books or students based on the mode
  useEffect(() => {
    if (mode === "issueBook") {
      fetchBooks();
    } else if (mode === "assignStudent") {
      fetchStudents();
    }
  }, [mode, selectedBook, selectedStudent]);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await getAllBooks();
      if (response && response.books) {
        setList(response.books);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      notificationHandler(true, "Error fetching books", "error");
      console.error("Error fetching books", error);
    }
  };

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      if (response && response.students) {
        setList(response.students);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      notificationHandler(true, "Error fetching students", "error");
      console.error("Error fetching students", error);
    }
  };

  // Function to handle change in the selected book or student
  const handleItemChange = (event, newValue) => {
    setSelectedItem(newValue);
    setSelectedItemDetails(newValue);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (mode === "issueBook") {
        const lendingData = {
          bookId: selectedItem,
          studentId: selectedStudent._id,
        };
        const response = await createLending(lendingData);
        if (response.errors && response.errors.length > 0) {
          notificationHandler(true, "Error issuing book.", "error");
          console.error("Validation errors:", response.errors);
          return;
        }
        await updateBook(selectedItem, { status: "issued" });
        notificationHandler(true, "Successfully issued book", "success");
      } else if (mode === "assignStudent") {
        const lendingData = {
          bookId: selectedBook._id,
          studentId: selectedItem,
        };
        const response = await createLending(lendingData);
        if (response.errors && response.errors.length > 0) {
          notificationHandler(true, "Error assigning student.", "error");
          console.error("Validation errors:", response.errors);
          return;
        }
        notificationHandler(true, "Successfully assigned borrower", "success");
      }
      setSelectedItem("");
      setSelectedItemDetails("");
      onClose();
      onBookIssued();
    } catch (error) {
      console.error("Error submitting form:", error);
      notificationHandler(true, "Error submitting form.", "error");
    }
  };

  // Handle close button click
  const onCloseHandle = () => {
    setSelectedItem("");
    setSelectedItemDetails(null);
    setList([]);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onCloseHandle}>
      <div className="modal-content issuance-modal">
        <div className="modal-header">
          <h3>
            {mode === "issueBook"
              ? `Issue Book to "${selectedStudentName || "Selected Student"}"`
              : `Assign Borrower for "${selectedBook?.title || "a Book"}"`}
          </h3>

          <IconButton
            onClick={onCloseHandle}
            className="close-icon close-button"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <form className="modal-form">
          <FormControl>
            <Autocomplete
              value={selectedItem}
              onChange={handleItemChange}
              options={list}
              getOptionLabel={(option) =>
                mode === "issueBook" ? option.title : option.name
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    mode === "issueBook" ? "Select Book" : "Select Student"
                  }
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          {selectedItemDetails && (
            <div className="selected-item-details">
              {mode === "issueBook" ? (
                <div>
                  <Typography variant="h6">Book Details</Typography>
                  <Typography variant="body2">
                    <strong>Title:</strong> {selectedItemDetails.title}
                  </Typography>
                  <Typography variant="body2">
                    <strong>ID:</strong> {selectedItemDetails.bookId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Author:</strong> {selectedItemDetails.author}
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography variant="h6">Student Details</Typography>
                  <Typography variant="body2">
                    <strong>Name:</strong> {selectedItemDetails.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>ID:</strong> {selectedItemDetails.studentId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedItemDetails.email}
                  </Typography>
                </div>
              )}
            </div>
          )}
          <div className="modal-buttons">
            <Button
              variant="contained"
              className="issue-button"
              onClick={handleSubmit}
              disabled={!selectedItem}
            >
              {mode === "issueBook" ? "Issue Book" : "Assign Borrower"}
            </Button>
            <Button
              variant="contained"
              className="cancel-button"
              onClick={onCloseHandle}
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookIssuanceModal;
