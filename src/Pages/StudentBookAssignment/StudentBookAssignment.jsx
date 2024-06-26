import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  Autorenew as AutorenewIcon,
  KeyboardReturn as KeyboardReturnIcon,
  Person as PersonIcon,
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
  // State for managing the count of issued books
  const [issuedBooksCount, setIssuedBooksCount] = useState(0);

  // State for managing book details for the modal
  const [bookDetails, setBookDetails] = useState(null);

  // State for managing the modal mode (renew/return)
  const [modalMode, setModalMode] = useState(null);

  const [paginationState, setPaginationState] = useState({
    total: 0,
    page: 0,
    rowsPerPage: 2,
  });
  // Accessing the notification handler to display notifications
  const { notificationHandler } = useAppContext();

  //Effect to fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  //Effect to fetch issued books on component mount
  useEffect(() => {
    if (selectedStudent) {
      fetchIssuedBooks(
        selectedStudent._id,
        paginationState.page,
        paginationState.rowsPerPage
      );
    }
  }, [selectedStudent, paginationState.page, paginationState.rowsPerPage]);

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
      const response = await getTransactionByStudentId(studentId);
      if (response && response.books && response.books.length > 0) {
        const { books: transactions, total: issuedBooksCount } = response;

        setIssuedBooks(transactions);
        setIssuedBooksCount(issuedBooksCount);
        setPaginationState((prevState) => ({
          ...prevState,
          total: issuedBooksCount,
        }));
      } else {
        setIssuedBooks([]);
        setIssuedBooksCount(0);
      }
    } catch (error) {
      notificationHandler(true, "Error fetching issued books", "error");
      console.error("Error fetching issued books:", error);
      setIssuedBooks([]);
      setIssuedBooksCount(0);
    }
  };

  // Function to handle onChange event
  const handleStudentChange = (event, newValue) => {
    setSelectedStudent(newValue);
    setSelectedStudentName(newValue ? newValue.name : "");
  };

    // Function to handle the book renew 
  const handleRenew = (book) => {
    setSelectedBook(book);
    setBookDetails({
      title: book.bookId?.title,
      author: book.bookId?.author,
      dueDate: book.dueDate,
    });
    setModalMode("renew");
    setOpenRenewReturnModal(true);
  };

    // Function to handle the return of a book 
  const handleReturn = (book) => {
    setSelectedBook(book);
    setBookDetails({
      title: book.bookId?.title,
      author: book.bookId?.author,
      dueDate: book.dueDate,
    });
    console.log("book details from parent 1", setBookDetails);
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
    fetchIssuedBooks(
      selectedStudent._id,
      paginationState.page,
      paginationState.rowsPerPage
    );
  };

  // Function to close the Issuance modal and refresh issued books list
  const handleCloseIssuanceModal = () => {
    setOpenIssuanceModal(false);
    if (selectedStudent) {
      fetchIssuedBooks(
        selectedStudent._id,
        paginationState.page,
        paginationState.rowsPerPage
      );
    }
  };

  // Function to handle renewing a book for the selected student
  const handleRenewBook = async () => {
    if (selectedBook.renewalCount >= 2) {
      notificationHandler(
        true,
        "Cannot renew book, renewal limit reached",
        "warning"
      );
      return;
    }
    try {
      await createRenewal(selectedBook._id);
      handleCloseRenewReturnModal();
      notificationHandler(true, "Book renewed successfully", "success");
    } catch (error) {
      notificationHandler(true, "Error renewing book", "error");
      console.error("Error renewing book:", error);
    }
  };

  // Function to handle returning a book for the selected student
  const handleReturnBook = async () => {
    try {
      await updateReturnedDate(selectedBook._id);
      const updatedBooks = issuedBooks.filter(
        (book) => book._id !== selectedBook._id
      );
      console.log("updatedBooks", updatedBooks);
      setIssuedBooks(updatedBooks);
      setOpenRenewReturnModal(false);
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
    {
      key: "dueDate",
      label: "Due Date",
    },
  ];

  // Define table actions 
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

    // Handle page change for pagination
  const handlePageChange = (newPage, rowsPerPage) => {
    const maxPage = Math.ceil(issuedBooksCount / rowsPerPage) - 1;
    const validNewPage = Math.min(newPage, maxPage);
    setPaginationState((prevState) => ({
      ...prevState,
      page: validNewPage,
    }));
  };

    // Handle rows per page change for pagination
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setPaginationState((prevState) => ({
      ...prevState,
      rowsPerPage: newRowsPerPage,
      page: 0,
    }));
  };
  
    // Define the issue book button
  const issueBookBtn = (
    <Button
      variant="outlined"
      startIcon={<AddIconButton />}
      onClick={handleIssueBookClick}
      className="issue-book-button"
    >
      Issue Book
    </Button>
  );

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
              option.name.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Student"
              variant="outlined"
              size="small"
              className="autocomplete-input"
            />
          )}
          className="autocomplete"
        />
      </Box>

      {selectedStudent ? (
        <>
          <CardItem
            data={selectedStudent}
            columns={columns}
            issueBookBtn={issueBookBtn}
            image="Assets/user.png"
          />
          <Box className="table-container">
            <div className="table-content">
              <GenericTable
                data={issuedBooks}
                columns={bookColumns}
                actions={actions}
                total={paginationState.total}
                page={paginationState.page}
                rowsPerPage={paginationState.rowsPerPage}
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
          bookDetails={bookDetails}
        />
      )}
      {openIssuanceModal && (
        <BookIssuanceModal
          isOpen={openIssuanceModal}
          onClose={handleCloseIssuanceModal}
          mode="issueBook"
          selectedBook={selectedBook}
          selectedStudent={selectedStudent}
          onBookIssued={() =>
            fetchIssuedBooks(
              selectedStudent._id,
              paginationState.page,
              paginationState.rowsPerPage
            )
          }
          selectedStudentName={selectedStudentName}
        />
      )}
    </Box>
  );
};

export default StudentBookAssignment;
