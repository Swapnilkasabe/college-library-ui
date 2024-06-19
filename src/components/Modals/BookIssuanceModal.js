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
import {
  getAllBooks,
  getBookById,
  updateBook,
} from "../../services/book.service";
import getTransactionsByStudentId, {
  getTransactionByStudentId,
} from "../../services/bookTransaction.service";
import CloseIcon from "@mui/icons-material/Close";
import { createLending } from "../../services/bookTransaction.service";
import { useAppContext } from "../../contexts/AppContext.Provider";
import { getAllStudents } from "../../services/student.service";
import "./Modal.css";

const BookIssuanceModal = ({
  isOpen,
  onClose,
  mode,
  selectedBook,
  selectedStudent,
  onBookIssued,
  selectedStudentName,
}) => {
  const { notificationHandler } = useAppContext();
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [isBookAlreadyIssued, setIsBookAlreadyIssued] = useState(false);
  const [selectedBookDetails, setSelectedBookDetails] = useState(null);

  useEffect(() => {
    if (mode === "issueBook") {
      fetchBooks();
    } else if (mode === "assignStudent") {
      fetchStudents();
    }
  }, [mode]);

  const fetchBooks = async () => {
    try {
      const { books } = await getAllBooks(); // Fetch only available books
      setList(books);
    } catch (error) {
      notificationHandler(true, "Error fetching books", "error");
      console.error("Error fetching books", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const { students } = await getAllStudents();
      setList(students);
    } catch (error) {
      notificationHandler(true, "Error fetching students", "error");
      console.error("Error fetching students", error);
    }
  };

  const handleItemChange = (event, newValue) => {
    setSelectedItem(newValue);
    setSelectedItemDetails(newValue);
    setIsBookAlreadyIssued(false);

    if (mode === "issueBook" && newValue) {
      fetchBookDetails(newValue._id);
      checkBookAlreadyIssued(newValue._id, selectedStudent?._id);
    }
  };

  const fetchBookDetails = async (bookId) => {
    try {
      const { book } = await getBookById(bookId);
      setSelectedBookDetails(book);
    } catch (error) {
      notificationHandler(true, "Error fetching book details", "error");
      console.error("Error fetching book details", error);
    }
  };

  const checkBookAlreadyIssued = async (bookId, studentId) => {
    try {
      const response = await getTransactionByStudentId(studentId);
      if (response && response.books) {
        const issuedBooksIds = response.books.map((book) => book.bookId._id);
        setIsBookAlreadyIssued(issuedBooksIds.includes(bookId));
      }
    } catch (error) {
      console.error("Error checking book issuance status:", error);
      notificationHandler(true, "Error checking book issuance status", "error");
    }
  };

  const handleSubmit = async () => {
    try {
      if (mode === "issueBook" && isBookAlreadyIssued) {
        notificationHandler(
          true,
          "This book is already issued to the student.",
          "warning"
        );
        return;
      }

      let lendingData = {};
      if (mode === "issueBook") {
        lendingData = {
          bookId: selectedItem?._id,
          studentId: selectedStudent?._id,
        };
      } else if (mode === "assignStudent") {
        lendingData = {
          bookId: selectedBook?._id,
          studentId: selectedItem?._id,
        };
      }

      const response = await createLending(lendingData);
      if (response.errors && response.errors.length > 0) {
        notificationHandler(
          true,
          `Error ${
            mode === "issueBook" ? "issuing book" : "assigning student"
          }`,
          "error"
        );
        console.error("Validation errors:", response.errors);
        return;
      }

      notificationHandler(
        true,
        `Successfully ${
          mode === "issueBook" ? "issued book" : "assigned borrower"
        }`,
        "success"
      );
      await onBookIssued();
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      notificationHandler(true, "Error submitting form.", "error");
    }
  };

  const handleClose = () => {
    setSelectedItem(null);
    setSelectedItemDetails(null);
    setSelectedBookDetails(null);
    setList([]);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="modal-content issuance-modal">
        <div className="modal-header">
          <h3>
            {mode === "issueBook"
              ? `Issue Book to "${selectedStudentName || "Selected Student"}"`
              : `Assign Borrower for "${selectedBook?.title || "a Book"}"`}
          </h3>
          <IconButton onClick={handleClose} className="close-icon close-button">
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
          {selectedItemDetails && mode === "issueBook" && (
            <div className="selected-item-details">
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
          )}
          {selectedItemDetails && mode === "assignStudent" && (
            <div className="selected-item-details">
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
              onClick={handleClose}
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
