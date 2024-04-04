import React, { useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Typography,
  Box,
  } from "@mui/material";
import GenericTable from "../../components/Common/GenericTable";
import BookLendingModal from "../../components/Modals/BookLendingModal";
import { useAppContext } from "../../contexts/AppContext.Provider";
import "../../commonStyles/Pages.css";
import CardItem from "../../components/Common/CardItem";
import { DeleteIconButton, EditIconButton } from "../../components/Icons/Icons";

const initialBooksData = [
  {
    id: 1,
    name: "Book1",
    bookID: "B001",
    author: "Author1",
    description: "Description1",
    Status: "issued",
  },
];

const StudentBookAssignment = () => {
  // Accessing students state from context
  const { students } = useAppContext();
  // State for managing selected student
  const [selectedStudent, setSelectedStudent] = useState(null);
  // State for managing selected book
  const [selectedBook, setSelectedBook] = useState(null);
  // State for managing modal visibility
  const [openModal, setOpenModal] = useState(false);

  // Function to handle onChange event for selecting a student
  const handleStudentChange = (e) => {
    const selectedId = e.target.value;
    const selectedStudent = students.find(
      (student) => student.id === selectedId
    );
    setSelectedStudent(selectedStudent);
  };

  // Function to handle edit action
  const handleEdit = (book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  // Function to handle delete action
  const handleDelete = (book) => {
    const bookId = book.id;
    // // const updatedBooks = initialBooks.filter(b => b.id !== bookId);
    // console.log("Updated books after deletion:", updatedBooks);
    // setInitialBooks(updatedBooks);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // Define book table actions
  const bookColumns = [
    { key: "name", label: "Name" },
    { key: "bookID", label: "ID" },
    { key: "author", label: "Author" },
    { key: "description", label: "Description" },
    { key: "Status", label: "Status" },
  ];

  // Define book table actions
  const actions = [
    {
      label: "Edit",
      handler: handleEdit,
      icon: <EditIconButton/>,
    },
    {
      label: "RETURN",
      handler: handleDelete,
      icon: <DeleteIconButton/>,
    },
  ];

  return (
    <Box className="page-container">
      <Box className="page-form-container">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            value={selectedStudent ? selectedStudent.id : ""}
            onChange={handleStudentChange}
            displayEmpty
            className="dropdown-select"
          >
            <MenuItem value="" disabled className="select-option">
              <em>Select Student</em>
            </MenuItem>
            {students
              ? students.map((student) => (
                  <MenuItem
                    key={student.id}
                    value={student.id}
                    className="dropdown-item"
                  >
                    {student.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </Box>
      {selectedStudent && (
        <CardItem
          data={selectedStudent}
          columns={Object.keys(selectedStudent).map((key) => ({
            key,
            label: key.toLowerCase(),
          }))}
          image="Assets/user.png"
        />
      )}{" "}
      <Box className="table-container">
        <Typography variant="h6" className="table-heading">
          <em>Issued:-</em>
        </Typography>
        <div className="table-content">
          <GenericTable
            data={initialBooksData}
            columns={bookColumns}
            actions={actions}
          />
        </div>
      </Box>
      {openModal && (
        <BookLendingModal
          isOpen={openModal}
          book={selectedBook}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

export default StudentBookAssignment;
