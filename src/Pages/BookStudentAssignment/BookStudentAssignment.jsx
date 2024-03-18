import React, { useState } from "react";
import { MenuItem, FormControl, Select, Typography, Box } from "@mui/material";
import GenericTable from "../../components/Common/GenericTable";
import '../../Pages/BookLending'

const initialStudents = [
  { id: 1, name: "John Doe", email: "test@test.com", phone: "11" },
];

const initialBooks = [
  {
    id: 1,
    name: "Book1",
    bookID: "B001",
    author: "Author1",
    description: "Description1",
  },
  {
    id: 2,
    name: "Book2",
    bookID: "B002",
    author: "Author2",
    description: "Description2",
  },
  {
    id: 3,
    name: "Book3",
    bookID: "B003",
    author: "Author3",
    description: "Description3",
  },
];

  const BookStudentAssignment = () => {
  // State for storing student data
  const [students, setStudents] = useState(initialStudents);
  // State for storing book data
  const [books, setBooks] = useState(initialBooks);
  // State for managing selected book
  const [selectedBook, setSelectedBook] = useState(null);

  // Function to handle onChange event
  const handleBookChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedBook = books.find(
      (book) => book.id === selectedId
    );
    setSelectedBook(selectedBook);
  };

   // Define student table columns
  const studentColumns = [
    { key: "name", label: "Name" },
    { key: "id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];

  // Define book table columns
  const bookColumns = [
    { key: "name", label: "Name" },
    { key: "bookID", label: "Book ID" },
    { key: "author", label: "Author" },
    { key: "description", label: "Description" },
  ];

  // Define student table actions
  const actions = [
    { label: "Edit", handler: "" },
    { label: "Delete", handler: "" },
  ];

  return (
    <Box className="book-page-container">
   <Typography variant="h5">Book Page</Typography>      
    <Box className="book-form-container">
      <Typography className="select-book-text">Select Book:{" "} </Typography>
        <FormControl>
          <Select
            value={selectedBook ? selectedBook.id : ""}
            onChange={handleBookChange}
            displayEmpty
            className="dropdown-select"
          >
            <MenuItem value="" disabled className="select-book-option">
              Select Book
            </MenuItem>
            {books?
            books.map((book) => (
              <MenuItem key={book.id} value={book.id} className="dropdown-item">
                {book.name}
              </MenuItem>
            )): null}
          </Select>
        </FormControl>
      </Box>
      <Box className="book-table-container">
        <Typography>Book Details</Typography>
        <div className="table-content">
          <GenericTable
            data={selectedBook ? [selectedBook] : []}
            columns={bookColumns}
          />
        </div>
      </Box>
      <Box className="student-table-container">
        <Typography>Student Details</Typography>
        <div className="table-content">
          <GenericTable data={students} columns={studentColumns}  actions={actions} />
        </div>
      </Box>
    </Box>
  );
};

export default BookStudentAssignment;
