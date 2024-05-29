import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Typography,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Autorenew as AutorenewIcon,
  KeyboardReturn as KeyboardReturnIcon,
  LibraryBooks as LibraryBooksIcon,
} from "@mui/icons-material";
import { getAllBooks } from "../../services/book.service";
import {
  createRenewal,
  getTransactionByBookId,
  updateReturnedDate,
} from "../../services/bookTransaction.service";
import { useAppContext } from "../../contexts/AppContext.Provider";
import GenericTable from "../../components/Common/GenericTable";
import BookIssuanceModal from "../../components/Modals/BookIssuanceModal";
import RenewReturnModal from "../../components/Modals/RenewReturnModal";
import { AddIconButton } from "../../components/Icons/Icons";
import CardItem from "../../components/Common/CardItem";
import "../../commonStyles/Pages.css";


const BookStudentAssignment = () => {
  // State for managing the list of books
  const [books, setBooks] = useState([]);
    // State for managing selected book
  const [selectedBook, setSelectedBook] = useState(null);
    // State for managing book issuance modal visibility 
  const [openIssuanceModal, setOpenIssuanceModal] = useState(false);
    // State for managing renew/return modal visibility 
  const [openRenewReturnModal, setOpenRenewReturnModal] = useState(false);
  // State for managing students with issued books
  const [issuedStudents, setIssuedStudents] = useState([]);
  // State for managing the selected student
  const [selectedStudent, setSelectedStudent] = useState(null);
  // State for managing the title of the selected book
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  // State for managing the mode of the modal
  const [modalMode, setModalMode] = useState(null);

  // Accessing the notification handler to display notifications
  const { notificationHandler } = useAppContext();

  //Effect to fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

   //Effect to fetch students on component mount
  useEffect(() => {
    if (selectedBook) {
      fetchIssuedStudents(selectedBook._id);
    }
  }, [selectedBook]);

  // Function to fetch books
  const fetchBooks = async () => {
    try {
      const { books } = await getAllBooks();
      setBooks(books);
    } catch (error) {
      console.error("Error fetching books", error);
      notificationHandler(true, "Error fetching books", "error");
    }
  };

  //Function to fetch book issued students
  const fetchIssuedStudents = async (bookId) => {
    try {
      const issuedStudents = await getTransactionByBookId(bookId);
      setIssuedStudents(issuedStudents); 
    } catch (error) {
      console.error("Error fetching issued students", error);
      notificationHandler(true, "Error fetching issued students", "error");
    }
  };

  // Function to handle onChange event
  const handleBookChange = (e) => {
    const selectedId = e.target.value;
    const selectedBook = books.find((book) => book._id === selectedId);
    setSelectedBook(selectedBook);
    setSelectedBookTitle(selectedBook.title);
  };

  const handleIssueBookClick = () => {
    setOpenIssuanceModal(true);
  };


  // Function to handle renewing a book
  const handleRenew = (student) => {
    setSelectedStudent(student);
    setModalMode("renew");
    setOpenRenewReturnModal(true);
  };

  // Function to handle returning a book
  const handleReturn = (student) => {
    setSelectedStudent(student);
    setModalMode("return");
    setOpenRenewReturnModal(true);
  };

  // Function to handle renewing a book for the selected student
  const handleRenewBook = async () => {
    try {
      await createRenewal(selectedStudent._id);
      handleCloseRenewReturnModal();
    } catch (error) {
      notificationHandler(true, "Error renewing book", "error");
      console.error("Error renewing book:", error);
    }
  };

// Function to handle returning a book for the selected student
  const handleReturnBook = async () => {
    try {
      await updateReturnedDate(selectedStudent._id);
      const updatedStudents = issuedStudents.filter(
        (student) => student._id !== selectedStudent._id
      );
      setIssuedStudents(updatedStudents); 
      setOpenRenewReturnModal(false);
      notificationHandler(true, "Book returned successfully", "success");
    } catch (error) {
      notificationHandler(true, "Error returning book", "error");
      console.error("Error returning book:", error);
    }
  };

  // Function to close the RenewReturnModal
  const handleCloseRenewReturnModal = () => {
    setOpenRenewReturnModal(false);
  };

  // Function to close the BookIssuanceModal
  const handleCloseIssuanceModal =()=>{
    setOpenIssuanceModal(false);
    fetchIssuedStudents();
  }

    // Define table columns
  const columns = [
    { key: "title", label: "Title" },
    { key: "bookId", label: "Book ID" },
    { key: "author", label: "Author" },
    { key: "description", label: "Description" },
  ]

    // Define student columns 
  const studentColumns = [
    {
      key: "studentId$name",
      label: "Name",
      isNestedKey: true,
      nestedKeyDelimiter: "$",
    },
    {
      key: "studentId$studentId",
      label: "ID",
      isNestedKey: true,
      nestedKeyDelimiter: "$",
    },
    {
      key: "studentId$email",
      label: "Email",
      isNestedKey: true,
      nestedKeyDelimiter: "$",
    },
    {
      key: "studentId$phoneNumber",
      label: "Phone",
      isNestedKey: true,
      nestedKeyDelimiter: "$",
    },
    { key: "status", label: "Status" },
  ]

  // Define table actions with custom icons
  const actions = [
    {
      label: "Renew",
      handler: handleRenew,
      icon: <AutorenewIcon />,
      tooltip: "Renew",
    },
    {
      label: "Return",
      handler: handleReturn,
      icon: <KeyboardReturnIcon />,
      tooltip: "Return",
    },
  ]

  return (
    <Box className="page-container">
      <Box className="page-form-container">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            value={selectedBook ? selectedBook._id : ""}
            onChange={handleBookChange}
            displayEmpty
            className="dropdown-select"
          >
            <MenuItem value="" disabled className="select-option">
              <em>Select Book</em>
            </MenuItem>
            {books.map((book) => (
              <MenuItem
                key={book._id}
                value={book._id}
                className="dropdown-item"
              >
                {book.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedBook && (
        <CardItem
          data={selectedBook}
          columns={columns}
          image="Assets/book.png"
        >
        <Tooltip title="Click to issue a new book" arrow>
            <Button
              variant="outlined"
              startIcon={<AddIconButton />}
              onClick={handleIssueBookClick}
              className="issue-book-button"
            >
              Issue Book
            </Button>
          </Tooltip>
          </CardItem>
      )}
    
      <Box className="table-container">
        <Typography variant="h5" className="table-heading">
          <div className="heading-content">
            <LibraryBooksIcon sx={{ marginRight: "0.5rem" }} />
            <em>Currently Borrowed By:</em>
          </div>
        </Typography>
        <div className="table-content">
          <GenericTable
            data={issuedStudents}
            columns={studentColumns}
            actions={actions}
          />
        </div>
      </Box>
      {openRenewReturnModal && (
        <RenewReturnModal
          isOpen={openRenewReturnModal}
          onClose={handleCloseRenewReturnModal} 
          onAction={modalMode === "renew" ? handleRenewBook : handleReturnBook}
          actionType={modalMode}
        />
      )}
      {openIssuanceModal && (
        <BookIssuanceModal
          isOpen={openIssuanceModal}
          onClose={handleCloseIssuanceModal}
          mode="assignStudent"
          selectedBook={selectedBook}
          selectedBookTitle = {selectedBookTitle}
          onBookIssued={fetchIssuedStudents}
        />
      )}
    </Box>
  );
};

export default BookStudentAssignment;
