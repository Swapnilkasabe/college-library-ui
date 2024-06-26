import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import StudentModal, { DefaultData } from "../../components/Modals/StudentModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import { AddIconButton, DeleteIconButton, EditIconButton } from "../../components/Icons/Icons";
import { studentCreationValidation, studentUpdateValidation } from "../../utilities/formValidation";
import { createStudent, deleteStudent, getAllStudents, updateStudent } from "../../services/student.service";
import { useAppContext } from "../../contexts/AppContext.Provider";
import "../../commonStyles/Pages.css";

const Student = () => {
    // State to manage list of students
  const [students, setStudents] = useState([]);
    // State to manage student being edited
  const [editingStudent, setEditingStudent] = useState(DefaultData);
    // State to manage modal visibility for add/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
    // State to manage delete confirmation dialog visibility
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    // State to manage the student being deleted
  const [deletingStudent, setDeletingStudent] = useState(null);

    // Accessing the notification handler to display notifications
  const { notificationHandler } = useAppContext();

    // State to manage pagination
  const [paginationState, setPaginationState] = useState({
    total: 0,
    page: 0,
    rowsPerPage: 2,
  });

    // Function to fetch students 
  const fetchStudents = async (page, rowsPerPage) => {
    try {
      const response = await getAllStudents(page, rowsPerPage);
      const { students, totalStudentsCount } = response;
      setStudents(students);
      setPaginationState((prevState) => ({
        ...prevState,
        total: totalStudentsCount,
      }));
    } catch (error) {
      console.error("Error fetching students", error);
      notificationHandler(true, "Error fetching students", "error");
    }
  };

    // Effect to fetch students on component mount 
  useEffect(() => {
    fetchStudents(paginationState.page, paginationState.rowsPerPage);
  }, [paginationState.page, paginationState.rowsPerPage]);

  const openAddAndEditModal = (student) => {
    setIsModalOpen(true);
    setEditingStudent(
      !isEmptyString(student?.studentId) ? student : DefaultData
    );
  };

    // Function to open the add/edit modal 
  const closeAddAndEditModal = () => {
    setIsModalOpen(false);
    setEditingStudent(DefaultData);
  };

    // Function to handle adding or updating a student
  const handleAddStudent = async (newStudent) => {
    try {
      let response;
      if (newStudent?._id) {

        // Checking for existing student with the same ID, email, or phone number
        const existingStudent = students.find(student =>
          (student.studentId === newStudent.studentId ||
           student.email === newStudent.email ||
           student.phoneNumber === newStudent.phoneNumber) &&
          student._id !== newStudent._id  
        );
  
        if (existingStudent) {
          notificationHandler(
            true,
            "Another student with the provided ID, email, or phone number already exists",
            "error"
          );
          return;
        }
        // Validating the student data
        const { errors, isError } = studentUpdateValidation(newStudent);
        if (isError) {
          notificationHandler(
            true,
            "Validation error: " + JSON.stringify(errors),
            "error"
          );
          return;
        }
        // Updating the student
        response = await updateStudent(newStudent.studentId, newStudent);
      } else {

        // Checking for existing student with the same ID, email, or phone number
        const existingStudent = students.find(student =>
          student.studentId === newStudent.studentId ||
          student.email === newStudent.email ||
          student.phoneNumber === newStudent.phoneNumber
        );
  
        if (existingStudent) {
          notificationHandler(
            true,
            "Student with the provided ID, email, or phone number already exists",
            "error"
          );
          return;
        }
       
        // Validating the student data
        const { errors, isError } = studentCreationValidation(newStudent);
        if (isError) {
          notificationHandler(
            true,
            "Validation error: " + JSON.stringify(errors),
            "error"
          );
          return;
        }
          // Creating a new student
        response = await createStudent(newStudent);
      }

      if (response?.errors?.length > 0) {
        console.error("Validation errors:", JSON.stringify(response.errors));
        notificationHandler(true, "Validation errors occurred", "error");
        return;
      }

      const successMessage = newStudent?._id
        ? "Successfully updated student"
        : "Successfully added student";
      notificationHandler(true, successMessage, "success");

      fetchStudents(paginationState.page, paginationState.rowsPerPage);
      closeAddAndEditModal();
    } catch (error) {
      console.error("Error adding/updating student", error);
      notificationHandler(true, "Error adding/updating student", "error");
    }
  };

  // Function to handle student deletion
  const handleDeleteStudent = (student) => {
    setDeletingStudent(student.studentId);
    setDeleteConfirmationOpen(true);
  };

  // Function to confirm student deletion
  const confirmDelete = async () => {
    try {
      await deleteStudent(deletingStudent);
      fetchStudents(paginationState.page, paginationState.rowsPerPage);
      notificationHandler(true, "Successfully deleted student", "success");
    } catch (error) {
      console.error("Error deleting student", error);
      notificationHandler(true, "Error deleting student", "error");
    }
    setDeleteConfirmationOpen(false);
  };

  // Define table columns for students
  const columns = [
    { key: "name", label: "Name" },
    { key: "studentId", label: "ID" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
  ];

  // Define table actions 
  const actions = [
    {
      handler: openAddAndEditModal,
      icon: <EditIconButton />,
      tooltip: "Edit Student",
    },
    {
      handler: handleDeleteStudent,
      icon: <DeleteIconButton />,
      tooltip: "Delete Student",
    },
  ];

    // Define the add button for new students
  const addButton = (
    <Tooltip title="Click to add a new student" arrow>
      <Button
        className="add-button"
        variant="outlined"
        startIcon={<AddIconButton />}
        onClick={() => openAddAndEditModal()}
      >
        ADD
      </Button>
    </Tooltip>
  );

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="form-container"
    >
      <Typography variant="h5" className="heading" sx={{ overflowX: 'auto' }}>
        Student Page
      </Typography>
      <Box className="table-container" sx={{ overflowX: "auto", width: "100%" }}>
        <GenericTable
          data={students}
          columns={columns}
          actions={actions}
          total={paginationState.total}
          page={paginationState.page}
          addButton={addButton}
          rowsPerPage={paginationState.rowsPerPage}
          onPageChange={(newPage, rowsPerPage) => {
            setPaginationState((prevState) => ({
              ...prevState,
              page: newPage,
              rowsPerPage,
            }));
          }}
          onRowsPerPageChange={(newRowsPerPage) => {
            setPaginationState({
              ...paginationState,
              rowsPerPage: newRowsPerPage,
              page: 0,
            });
          }}
        />
      </Box>
      <StudentModal
        isOpen={isModalOpen}
        onClose={closeAddAndEditModal}
        onAdd={handleAddStudent}
        initialStudentData={
          isEmptyString(editingStudent.studentId) ? DefaultData : editingStudent
        }
      />
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
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
