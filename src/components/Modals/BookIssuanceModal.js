import React, { useState, useEffect } from "react";
import {
  Modal,
  FormControl,
  Button,
  Select,
  MenuItem,
  IconButton,
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
  const [selectedItem, setSelectedItem] = useState("");

  // Fetching books or students based on the mode
  useEffect(() => {
    if (mode === "issueBook") {
      fetchBooks();
    } else if (mode === "assignStudent") {
      fetchStudents();
    }
  }, [mode]);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const { books } = await getAllBooks();
      setList(books);
    } catch (error) {
      notificationHandler(true, "Error fetching books", "error");
      console.error("Error fetching books", error);
    }
  };

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const { students } = await getAllStudents();
      setList(students);
    } catch (error) {
      notificationHandler(true, "Error fetching students", "error");
      console.error("Error fetching students", error);
    }
  };

  // Function to handle change in the selected book or student
  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
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
    setList([]);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onCloseHandle}>
      <div className="modal-content issuance-modal">
        <div className="modal-header">
          <h3>
            {mode === "issueBook"
              ? `Issue Book to "${selectedStudentName}"`
              : `Assign Borrower for "${selectedBookTitle}"`}
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
            <Select
              value={selectedItem}
              onChange={handleItemChange}
              displayEmpty
              className="dropdown-select"
            >
              <MenuItem value="" disabled className="select-option">
                {mode === "issueBook" ? "Select Book" : "Select Student"}
              </MenuItem>
              {list.map((item) => (
                <MenuItem
                  key={item._id}
                  value={item._id}
                  className="dropdown-item"
                >
                  {mode === "issueBook" ? item.title : item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="modal-buttons">
            <Button
              variant="contained"
              className="issue-button"
              onClick={handleSubmit}
              disabled={!selectedItem}
            >
              {mode === "issueBook" ? "Issue Book" : "Assign Student"}
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
