import React, { useState } from "react";
import { MenuItem, FormControl, Select, Typography, Box } from "@mui/material";
import GenericTable from "../../components/Common/GenericTable";
import "./BookLending.css";

const StudentBookAssignment = () => {
  const initialStudents = [
    { id: 1, name: "John Doe", email: "test", phone: "11" },
    { id: 2, name: "Jane Smith", email: "test2", phone: "12" },
    { id: 3, name: "Alex Johnson", email: "test3", phone: "13" },
  ];

  const initialBooks = [
    {
      id: 1,
      name: "Book1",
      bookID: "B001",
      author: "Author1",
      description: "Description1",
    },
  ];

  // State for storing student data
  const [students, setStudents] = useState(initialStudents);
  // State for storing book data
  const [books, setBooks] = useState(initialBooks);
  // State for managing selected student
  const [selectedStudent, setSelectedStudent] = useState(null);

  //Function to handle onChange event
  const handleStudentChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedStudent = students.find(
      (student) => student.id === selectedId
    );
    setSelectedStudent(selectedStudent);
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
    { key: "bookID", label: "ID" },
    { key: "author", label: "Author" },
    { key: "description", label: "Description" },
  ];

  // Define book table actions
  const actions = [
    { label: "Edit", handler: "" },
    { label: "Delete", handler: "" },
  ];

  return (
    <Box className="student-page-container">
      <Typography variant="h5">Student Page</Typography>
      <Box className="student-form-container">
        <Typography className="select-student-text">
          Select Student:{" "}
        </Typography>
        <FormControl>
          <Select
            value={selectedStudent ? selectedStudent.id : ""}
            onChange={handleStudentChange}
            displayEmpty
            className="dropdown-select"
          >
            <MenuItem value="" disabled className="select-student-option">
              Select Student
            </MenuItem>
            {students.map((student) => (
              <MenuItem
                key={student.id}
                value={student.id}
                className="dropdown-item"
              >
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className="student-table-container">
        <Typography>Student Details</Typography>
        <div className="table-content">
          <GenericTable
            data={selectedStudent ? [selectedStudent] : []}
            columns={studentColumns}
          />
        </div>
      </Box>
      <Box className="book-table-container">
        <Typography>Book Details</Typography>
        <div className="table-content">
          <GenericTable data={books} columns={bookColumns} actions={actions} />
        </div>
      </Box>
    </Box>
  );
};

export default StudentBookAssignment;
