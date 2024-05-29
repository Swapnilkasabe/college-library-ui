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
import AutorenewIcon from "@mui/icons-material/Autorenew";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import "../../commonStyles/Pages.css";

const StudentBookAssignment = () => {
    // State for storing student data
  const [students, setStudents] = useState([]);
    // State for managing selected student
  const [selectedStudent, setSelectedStudent] = useState(null);
    // State for managing RenewReturnModal visibility
    const [openRenewReturnModal, setOpenRenewReturnModal] = useState(false);
    // State for managing book issuance modal
  const [openIssuanceModal, setOpenIssuanceModal] = useState(false);
  // State for managing issued books to students
  const [issuedBooks, setIssuedBooks] = useState([]);
    // State for managing selected book
  const [selectedBook, setSelectedBook] = useState(null);
    // State for managing the title of the selected book
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [modalMode, setModalMode] = useState(null);
  // Accessing the notification handler to display notifications
  const { notificationHandler } = useAppContext();

  //Effect to fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  //Effect to fetch issued books on component mount
  useEffect(() => {
    if (selectedStudent?._id) {
      fetchIssuedBooks();
    }
  }, [selectedStudent?._id]);

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
  const fetchIssuedBooks = async () => {
    try {
      const transactions = await getTransactionByStudentId(
        selectedStudent?._id
      );
      setIssuedBooks(transactions);
    } catch (error) {
      notificationHandler(true, "Error fetching issued books", "error");
      console.error("Error fetching issued books:", error);
    }
  };

  // Function to handle onChange event
  const handleStudentChange = (e) => {
    const selectedId = e.target.value;
    const selectedStudent = students.find(
      (student) => student._id === selectedId
    );
    setSelectedStudent(selectedStudent);
    setSelectedStudentName(selectedStudent.name);   
  };

  // Function to handle renewing a book
  const handleRenew = (book) => {
    setSelectedBook(book);
    setModalMode("renew");
    setOpenRenewReturnModal(true);
  };

  // Function to handle returning a book
  const handleReturn = (book) => {
    setSelectedBook(book);
    setModalMode("return");
    setOpenRenewReturnModal(true);
  };
  const handleIssueBookClick = () => {
    setOpenIssuanceModal(true);
  };

  const handleCloseRenewReturnModal = () => {
    setOpenRenewReturnModal(false);
    fetchIssuedBooks();
  };

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
      await updateReturnedDate(selectedBook._id);
      const updatedBooks = issuedBooks.filter(
        (book) => book._id !== selectedBook._id
      );
      setIssuedBooks(updatedBooks);
      setOpenRenewReturnModal(false);
      notificationHandler(true, "Book returned successfully", "success");
    } catch (error) {
      notificationHandler(true, "Error returning book", "error");
      console.error("Error returning book:", error);
    }
  };

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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            value={selectedStudent ? selectedStudent._id : ""}
            onChange={handleStudentChange}
            displayEmpty
            className="dropdown-select"
          >
            <MenuItem value="" disabled className="select-option">
              <em>Select Student</em>
            </MenuItem>
            {students.map((student) => (
              <MenuItem
                key={student._id}
                value={student._id}
                className="dropdown-item"
              >
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedStudent && (
        <CardItem
          data={selectedStudent}
          columns={[
            { key: "name", label: "Name" },
            { key: "studentId", label: "Student ID" },
            { key: "email", label: "Email" },
            { key: "phoneNumber", label: "Phone Number" },
          ]}
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
      )}
      <Box className="table-container">
        <Typography variant="h5" className="table-heading">
          <div className="heading-content">
            <LibraryBooksIcon sx={{ marginRight: "0.5rem" }} />
            <em>Issued Books:</em>
          </div>
        </Typography>

        <div className="table-content">
          <GenericTable
            data={issuedBooks}
            columns={bookColumns}
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
