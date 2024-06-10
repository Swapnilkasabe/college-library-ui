import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Tooltip,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  Autorenew as AutorenewIcon,
  KeyboardReturn as KeyboardReturnIcon,
  Person as PersonIcon
} from "@mui/icons-material";
import GenericTable from "../../components/Common/GenericTable";
import CardItem from "../../components/Common/CardItem";
import RenewReturnModal from "../../components/Modals/RenewReturnModal";
import BookIssuanceModal from "../../components/Modals/BookIssuanceModal";
import { AddIconButton } from "../../components/Icons/Icons";
import { getAllStudents } from "../../services/student.service";
import {
  createRenewal,
  getTransactionByStudentId,
  updateReturnedDate,
} from "../../services/bookTransaction.service";
import { useAppContext } from "../../contexts/AppContext.Provider";
import { getBookById } from "../../services/book.service";
import "../../commonStyles/Pages.css";



const StudentBookAssignment = () => {
  // State for storing student data
  const [students, setStudents] = useState([]);
  // State for managing the selected student
  const [selectedStudent, setSelectedStudent] = useState(null);
  // State for managing Renew/Return modal visibility
  const [openRenewReturnModal, setOpenRenewReturnModal] = useState(false);
  // State for managing book issuance modal visibility
  const [openIssuanceModal, setOpenIssuanceModal] = useState(false);
  // State for managing issued books to students
  const [issuedBooks, setIssuedBooks] = useState([]);
  // State for managing the selected book
  const [selectedBook, setSelectedBook] = useState(null);
  // State for managing the name of the selected student
  const [selectedStudentName, setSelectedStudentName] = useState("");
  // State for managing book details for the modal
  const [bookDetails, setBookDetails] = useState(null);
  // State for managing the modal mode (renew/return)
  const [modalMode, setModalMode] = useState(null);
    // State for managing the current page number
  const [currentPage, setCurrentPage] = useState(1);
    // State for managing the number of rows per page
  const [rowsPerPage, setRowsPerPage] = useState(5);
    // State for managing the total number of pages
  const [totalPages, setTotalPages] = useState(0);
    // Accessing the notification handler to display notifications
  const { notificationHandler } = useAppContext();

  //Effect to fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  //Effect to fetch issued books on component mount
  useEffect(() => {
    if (selectedStudent) {
      fetchIssuedBooks(selectedStudent._id);
    }
  }, [selectedStudent, currentPage, rowsPerPage]);

  // Function to fetch students
  const fetchStudents = async () => {
    try {
      const { students } = await getAllStudents();
      setStudents(students);
    } catch (error) {
      notificationHandler(true, "Error fetching students", "error");
      console.error("Error fetching students", error);
    }
  };

    // Function to fetch issued books
    const fetchIssuedBooks = async (studentId) => {
    if (!studentId) return;

    try {
      const { transactions, total } = await getTransactionByStudentId(
        studentId,
        currentPage,
        rowsPerPage
      );
      setIssuedBooks(transactions);
      setTotalPages(total);
    } catch (error) {
      notificationHandler(true, "Error fetching issued books", "error");
      console.error("Error fetching issued books:", error);
    }
  };
  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };


  // Function to handle onChange event
  const handleStudentChange = (event, newValue) => {
    setSelectedStudent(newValue);
    setSelectedStudentName(newValue ? newValue.name : "");
    if (newValue) {
      fetchIssuedBooks(newValue._id);
    }
  };

  // Function to handle renewing a book
  const handleRenew = async (book) => {
    setSelectedBook(book);
    const details = await getBookById(book.bookId);
    setBookDetails(details);
    setModalMode("renew");
    setOpenRenewReturnModal(true);
  };

  // Function to handle returning a book
  const handleReturn = async (book) => {
    setSelectedBook(book);
    const details = await getBookById(book.bookId);
    setBookDetails(details);
    setModalMode("return");
    setOpenRenewReturnModal(true);
  };

  // Function to open book issuance modal
  const handleIssueBookClick = () => {
    setOpenIssuanceModal(true);
  };

  // Function to close the Renew/Return modal and refresh issued books list
  const handleCloseRenewReturnModal = () => {
    setOpenRenewReturnModal(false);
    fetchIssuedBooks();
  };

  // Function to close the Issuance modal and refresh issued books list
  const handleCloseIssuanceModal = () => {
    setOpenIssuanceModal(false);
    fetchIssuedBooks();
  };

  // Function to handle renewing a book for the selected student
  const handleRenewBook = async () => {
    try {
      await createRenewal(selectedBook._id);
      handleCloseRenewReturnModal();
    } catch (error) {
      notificationHandler(true, "Error renewing book", "error");
      console.error("Error renewing book:", error);
    }
  };

  // Function to handle returning a book for the selected student
  const handleReturnBook = async () => {
    try {
      const response = await updateReturnedDate(selectedBook._id);
      const updatedBooks = issuedBooks.filter((book) => book._id !== selectedBook._id);
      setIssuedBooks(updatedBooks);
      setOpenRenewReturnModal(false);

      handleCloseRenewReturnModal();
      notificationHandler(true, "Book returned successfully", "success");
    } catch (error) {
      notificationHandler(true, "Error returning book", "error");
      console.error("Error returning book:", error);
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "studentId", label: "Student ID" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
  ];


  // Define table columns
  const bookColumns = [
    {
      key: "bookId$bookId",
      label: "ID",
      isNestedKey: true,
      nestedKeyDelimeter: "$",
    },
    {
      key: "bookId$title",
      label: "Title",
      isNestedKey: true,
      nestedKeyDelimeter: "$",
    },
    {
      key: "bookId$author",
      label: "Author",
      isNestedKey: true,
      nestedKeyDelimeter: "$",
    },
    {
      key: "bookId$description",
      label: "Description",
      isNestedKey: true,
      nestedKeyDelimeter: "$",
    },
    { key: "status", label: "Status" },
  ];


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
  ];

  return (
    <Box className="page-container">
      <Box className="page-form-container">
        <Autocomplete
          value={selectedStudent}
          onChange={handleStudentChange}
          options={students}
          getOptionLabel={(option) => option.name}
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              option.name?.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
          renderInput={(params) => (
            <TextField {...params} label="Select Student" variant="outlined" size="small" className="autocomplete-input" />
          )}
          className="autocomplete"
        />
      </Box>
      {selectedStudent ? (
        <>
          <CardItem
            data={selectedStudent}
            columns={columns}
            image="Assets/user.png"
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
          <Box className="table-container">
            <div className="table-content">
              <GenericTable
                data={issuedBooks}
                columns={bookColumns}
                actions={actions}
                page={currentPage}
                total={totalPages}
                limit={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
          </Box>
        </>
      ) : (
        <Box className="no-option-selected-message">
          <PersonIcon color="disabled" />
          <Typography>
            Please select a student from the dropdown to view their issued books
          </Typography>
        </Box>
      )}
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
          mode="issueBook"
          selectedBook={selectedBook}
          selectedStudent={selectedStudent}
          onBookIssued={fetchIssuedBooks}
          selectedStudentName={selectedStudentName}
        />
      )}
    </Box>
  );
};

export default StudentBookAssignment;
