import React, { useState } from "react";
import { Button } from "@mui/material";
import EditStudentModal from "../../components/Modals/EditStudentModal";
import AddStudentModal from "../../components/Modals/AddStudentModal";
import "./Student.css";
import GenericTable from "../../utilities/GenericTable";

const Student = () => {
  // State for storing student data
  const [students, setStudents] = useState([]);

  // State for managing the currently edited student
  const [editingStudent, setEditingStudent] = useState(null);

  // State for controlling the visibility of the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State for controlling the visibility of the add modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Function to open the add student modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Function to update a student details
  const handleUpdateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
  };

// Function to delete a student
const handleDeleteStudent = (studentId) => {
  console.log("Deleting student with id:", studentId);
  const updatedStudents = students.filter((student) => student.id !== studentId);
  console.log("Updated students:", updatedStudents);
  setStudents(updatedStudents);
};



  // Function to add a new student
  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    setIsAddModalOpen(false);
  };
 // Define table columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "id", label: "ID" },
    { key: "email", label: "Email ID" },
    { key: "phone", label: "Phone Number" },
  ];

  // Define table actions
  const actions = [
    { label: "Edit", handler: openEditModal },
    { label: "Delete", handler: handleDeleteStudent },
  ];

  return (
    <div className="form-container">
      <h2>Student Details</h2>
      <div className="button-container">
        <Button onClick={openAddModal}  variant="contained" color="primary">
          Add Student
        </Button>
      </div>
      {/* Display table of students */}
      <GenericTable data={students} columns={columns} actions={actions} />
      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        student={editingStudent}
        onUpdate={handleUpdateStudent}
      />
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddStudent}
      />
    </div>
  );
};

export default Student;
