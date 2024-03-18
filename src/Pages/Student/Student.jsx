import React, { useState } from "react";
import { Button } from "@mui/material";
import StudentModal, {DefaultData} from "../../components/Modals/StudentModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import "./Student.css";

const Student = () => {
  // State for storing student data
  const [students, setStudents] = useState([]);

  // State for managing the currently edited student
  const [editingStudent, setEditingStudent] = useState(DefaultData);

  // State for controlling the visibility of the add modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Function to open the add student modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Function to open the edit student modal
  const openEditModal = (student) => {
    setIsAddModalOpen(true);
    if (student) {
      setEditingStudent({ ...student });
    }
  };

  // Function to close the add student modal
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingStudent(DefaultData);
  };

  // Function to add a new student
  const handleAddStudent = (isEditMode) => (newStudent) => {
    if (isEditMode) {
      handleUpdateStudent(newStudent);
    } else {
      setStudents([...students, newStudent]);
    }

    setIsAddModalOpen(false);
  };

  // Function to update a student details
  const handleUpdateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents([...updatedStudents]);
  };

  // Function to delete a student
  const handleDeleteStudent = (deletedStudent) => {
    setStudents(students.filter((student) => student.id !== deletedStudent.id));
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
        <Button onClick={openAddModal} variant="contained" color="primary">
          Add Student
        </Button>
      </div>
      {/* Display table of students */}
      <GenericTable data={students} columns={columns} actions={actions} />
      <StudentModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddStudent(!isEmptyString(editingStudent.id))}
        initialStudentData={
          isEmptyString(editingStudent.id) ? DefaultData : editingStudent
        }
      />
    </div>
  );
};

export default Student;
