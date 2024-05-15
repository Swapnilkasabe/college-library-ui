import React, {useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import StudentModal, {
  DefaultData,
} from "../../components/Modals/StudentModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import {
  AddIconButton,
  DeleteIconButton,
  EditIconButton,
} from "../../components/Icons/Icons";
import "../../commonStyles/Pages.css";
import { studentCreationValidation, studentUpdateValidation } from "../../utilities/formValidation";
import { createStudent, deleteStudent, getAllStudents, updateStudent } from "../../services/student.service";
import { useAppContext } from "../../contexts/AppContext.Provider";

const Student = () => {
  // State for storing student data
  const [students, setStudents] = useState([]);

  // State for managing the currently edited student
  const [editingStudent, setEditingStudent] = useState(DefaultData);

  // State for controlling the visibility of the add modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //State for controlling the visibilty of the delete confirmation dialog
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  //State for managing the delete student operation
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Access state from context for displaying notification
  const { notificationHandler } = useAppContext();

  // Effect to fetch students on component mount
  useEffect(() => {


    fetchStudents();
  }, []);
  
  // Function to fetch all students
  const fetchStudents = async () => {
    try {
      const {students} = await getAllStudents();
      setStudents(students);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  // Function to open the openAddAndEditModal
  const openAddAndEditModal = (student) => {
    setIsModalOpen(true);
    setEditingStudent(!isEmptyString(student?.studentId) ? student : DefaultData);
  };

  // Function to close the add student modal
  const closeAddAndEditModal = () => {
    setIsModalOpen(false);
    setEditingStudent(DefaultData);
  };

// Function to add a new student
const handleAddStudent = async (newStudent) => {
  try {
    let response;

    if (newStudent?._id) {
      const {errors, isError} = studentUpdateValidation(newStudent);   
      if (isError) {
        throw new Error("Validation error: " + errors); 
         }
      response = await handleUpdateStudent(newStudent);
    } 
    else {
      const {errors, isError} = studentCreationValidation(newStudent);
      if (isError) {
         throw new Error("Validation error: " + errors); 
         }
      response = await createStudent(newStudent);
    }
    if (response && response.errors && response.errors.length > 0) {
      console.error("Validation errors:", response.errors);
      return;
    }   
    if (newStudent?._id) {
      notificationHandler(true, "Successfully updated student", "success");
    } else {
      notificationHandler(true, "Successfully added student", "success");
    }
    fetchStudents();
  } catch (error) {
    console.error('Error adding student', error);
  }
  setIsModalOpen(false);
};

// Function to update a student
const handleUpdateStudent = async (updatedStudent) => {
  try {
     const {errors, isError} = studentUpdateValidation(updatedStudent);
  if (isError) {
    throw new Error("Validation error: " + errors);
  
  }
    await updateStudent(updatedStudent.studentId, updatedStudent);
    fetchStudents();
    notificationHandler(true, "Successfully updated student", "success");
  } catch (error) {
    console.error('Error updating student:', error);
  }

}
  
  // Function to delete a student
  const handleDeleteStudent = async (deletedStudent) => {
    setDeletingStudent(deletedStudent);
    setDeleteConfirmationOpen(true);
  };

   // Function for delete confirmation
  const confirmDelete = async () => {
    try {
      const res = await deleteStudent(deletingStudent.studentId);  
      fetchStudents();
      notificationHandler(true, "Successfully deleted student", "success");
    } catch (error) {
      console.error('Error deleting student', error);
    }
    setDeleteConfirmationOpen(false);
  }

  // Define table columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "studentId", label: "ID" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
  ];

  // Define table actions with custom icons
  const actions = [
    { handler: openAddAndEditModal, icon: <EditIconButton/> },
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
            onClick={() => openAddAndEditModal()}
          >
            ADD
          </Button>
        </Box>

        <Box className="table-container">
          <GenericTable data={students} columns={columns} actions={actions} />
        </Box>
      </Grid>
      {/* Student modal component  */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={closeAddAndEditModal}
        onAdd={handleAddStudent}
        initialStudentData={
          isEmptyString(editingStudent.studentId) ? DefaultData : editingStudent
        }
      /> 
      {/* Component for delete confirmation */}
      <Dialog open= {deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
      <DialogTitle>
        Delete Student
      </DialogTitle>
      <DialogContent>
      Are you sure you want to delete?
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmDelete} color="error">
           Delete
        </Button>
        <Button onClick={() => setDeleteConfirmationOpen(false)}>
           Cancel
        </Button>
      </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Student;
