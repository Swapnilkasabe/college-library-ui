import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./Student.css";
import EditStudentModal from "../../components/Modals/EditStudentModal";

const Student = () => {
  // State for storing student data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
  ]);

  // State for managing the currently edited student
  const [editingStudent, setEditingStudent] = useState(null);

  // State for controlling the visibility of the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to add a new student
  const handleAddStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: "New Student",
      email: "newstudent@example.com",
      phone: "000-000-0000",
    };
    setStudents([...students, newStudent]);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to update a student details
  const handleUpdateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
  };

 // Function to delete a student
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="form-container">
      <h2>Student Details</h2>
      <div className="button-container">
        <Button onClick={handleAddStudent} variant="contained" color="primary">
          Add Student
        </Button>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="simple table" className="student-table">
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell className="actions-cell">
                    <Button
                      variant="contained"
                      onClick={() => openEditModal(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No student created
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EditStudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        student={editingStudent}
        onUpdate={handleUpdateStudent}
      />
    </div>
  );
};

export default Student;
