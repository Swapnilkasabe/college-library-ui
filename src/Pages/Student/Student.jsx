import React, {useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import StudentModal, {
  DefaultData,
} from "../../components/Modals/StudentModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import { useAppContext } from "../../contexts/AppContext.Provider";
import {
  AddIconButton,
  DeleteIconButton,
  EditIconButton,
} from "../../components/Icons/Icons";

import "../../commonStyles/Pages.css";

const Student = () => {
  // State for storing student data
  const { students, setStudents } = useAppContext();

  // State for managing the currently edited student
  const [editingStudent, setEditingStudent] = useState(DefaultData);

  // State for controlling the visibility of the add modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the openAddAndEditModal
  const openAddAndEditModal = (student) => {
    setIsModalOpen(true);
    if (student) {
      setEditingStudent({ ...student });
    }
  };

  // Function to close the add student modal
  const closeAddAndEditModal = () => {
    setIsModalOpen(false);
    setEditingStudent(DefaultData);
  };

  // Function to add a new student
  const handleAddStudent = (isEditMode) => (newStudent) => {
    if (isEditMode) {
      handleUpdateStudent(newStudent);
    } else {
      setStudents([...students, newStudent]);
    }

    setIsModalOpen(false);
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
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];

  // Define table actions with custom icons
  const actions = [
    { handler: openAddAndEditModal, icon: <EditIconButton /> },
    {
      handler: handleDeleteStudent,
      icon: <DeleteIconButton />,
    },
  ];

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="form-container"
    >
      <Typography variant="h5" className="heading">
        Student Page
      </Typography>

      <Grid>
        <Box className="button-container">
          <Button
            variant="outlined"
            startIcon={<AddIconButton />}
            onClick={openAddAndEditModal}
          >
            ADD
          </Button>
        </Box>

        <Box className="table-container">
          <GenericTable data={students} columns={columns} actions={actions} />
        </Box>
      </Grid>
      <StudentModal
        isOpen={isModalOpen}
        onClose={closeAddAndEditModal}
        onAdd={handleAddStudent(!isEmptyString(editingStudent.id))}
        initialStudentData={
          isEmptyString(editingStudent.id) ? DefaultData : editingStudent
        }
      /> 
    </Grid>
  );
};

export default Student;
