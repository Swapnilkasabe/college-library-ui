import React, { useState } from "react";
import { MenuItem, FormControl, Select, Typography, Box, Button } from "@mui/material";
import GenericTable from "../../components/Common/GenericTable";
import BookLendingModal from "../../components/Modals/BookLendingModal";
import { useAppContext } from "../../contexts/AppContext.Provider";
import CardItem from "../../components/Common/CardItem";

import "../../commonStyles/Pages.css";

const initialStudents = [
  { id: 1, name: "John Doe", email: "test@test.com", phone: "11" },
];

// Initial student data
const BookStudentAssignment = () => {
  //  Accessing books state from context
  const { books } = useAppContext();
  // State for managing selected book
  const [selectedBook, setSelectedBook] = useState(null);
  // State for managing modal visibility 
  const [openModal, setOpenModal] = useState(false);

  // Function to handle onChange event
  const handleBookChange = (e) => {
    const selectedId = e.target.value;
    const selectedBook = books.find((book) => book.id === selectedId);
    setSelectedBook(selectedBook);
  };

  // Function to handle edit action
  const handleEdit = (student) => {
    setSelectedBook(student);
    setOpenModal(true);
  };

  // Function to handle delete action
  const handleDelete = (student) => {
    const studentId = student.id;
    const updatedStudents = initialStudents.filter(s => s.id !== studentId);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // Define student table columns
  const studentColumns = [
    { key: "name", label: "Name" },
    { key: "id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
  ];


  // Define student table actions
  const actions = [
    {
      label: "Edit",
      handler: handleEdit,
      icon: (
        <Button variant="text" size="small">
          Edit
        </Button>
      ),
    },
    {
      label: "RETURN",
      handler: handleDelete,
      icon: (
        <Button variant="text" size="small">
          Return
        </Button>
      ),
    },
  ];


  return (
    <Box className="page-container">
      <Box className="page-form-container">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            value={selectedBook ? selectedBook.id : ""}
            onChange={handleBookChange}
            displayEmpty
            className="dropdown-select"
          >
            <MenuItem value="" disabled className="select-option">
              <em>Select Book</em>
            </MenuItem>
            {books?.map((book) => (
              <MenuItem key={book.id} value={book.id} className="dropdown-item">
                {book.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedBook && (
        <CardItem
          data={selectedBook}
          columns={Object.keys(selectedBook).map((key) => ({
            key,
            label: key.toLowerCase(),
          }))}
          image="../../../public/Assets/book.png"
        />
      )}
      <Box className="table-container">
        <Typography variant="h6" className="table-heading">
          <em>Issued to:-</em>
        </Typography>
        <div className="table-content">
          <GenericTable
            data={initialStudents}
            columns={studentColumns}
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

export default BookStudentAssignment;
