import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";
import StudentModal, { DefaultData } from "../../components/Modals/StudentModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import {
  AddIconButton,
  DeleteIconButton,
  EditIconButton,
} from "../../components/Icons/Icons";
import {
  studentCreationValidation,
  studentUpdateValidation,
} from "../../utilities/formValidation";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "../../services/student.service";
import { useAppContext } from "../../contexts/AppContext.Provider";
import "../../commonStyles/Pages.css";

const Student = () => {
  // State for storing student data
  const [students, setStudents] = useState([]);
  // State for managing the currently edited student
  const [editingStudent, setEditingStudent] = useState(DefaultData);
  // State for controlling the visibility of the add modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for controlling the visibility of the delete confirmation dialog
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  // State for managing the delete student operation
  const [deletingStudent, setDeletingStudent] = useState(null);
  // State for managing the total number of students
  const [totalStudents, setTotalStudents] = useState(0);
  // State for managing the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // State for managing the number of rows per page
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // State for managing the total number of pages
  const [pageCount, setPageCount] = useState(0);

  // Access state from context for displaying notification
  const { notificationHandler } = useAppContext();

  // Function to fetch all students
  const fetchStudents = async () => {
    try {
      const { students, total } = await getAllStudents(currentPage, rowsPerPage);
      setStudents(students);
      setTotalStudents(total);
      const calculatedPageCount = Math.ceil(total / rowsPerPage); 
      setPageCount(calculatedPageCount); 
    } catch (error) {
      console.error("Error fetching students", error);
      notificationHandler(true, "Error fetching students", "error");
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

  // Function to add and update student
  const handleAddStudent = async (newStudent) => {
    try {
      let response;
      if (newStudent?._id) {
        const { errors, isError } = studentUpdateValidation(newStudent);
        if (isError) {
          notificationHandler(true, "Validation error: " + JSON.stringify(errors), "error");
          return;
        }
        response = await updateStudent(newStudent.studentId, newStudent);
      } else {
        const { errors, isError } = studentCreationValidation(newStudent);
        if (isError) {
          notificationHandler(true, "Validation error: " + JSON.stringify(errors), "error");
          return;
        }
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

      fetchStudents();
      closeAddAndEditModal();
    } catch (error) {
      console.error("Error adding/updating student", error);
      notificationHandler(true, "Error adding/updating student", "error");
    }
  };

  // Function to delete a student
  const handleDeleteStudent = (student) => {
    setDeletingStudent(student.studentId);
    setDeleteConfirmationOpen(true);
  };

  // Function for delete confirmation
  const confirmDelete = async () => {
    try {
      await deleteStudent(deletingStudent);
      fetchStudents();
      notificationHandler(true, "Successfully deleted student", "success");
    } catch (error) {
      console.error("Error deleting student", error);
      notificationHandler(true, "Error deleting student", "error");
    }
    setDeleteConfirmationOpen(false);
  };

  // Define table columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "studentId", label: "ID" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
  ];

  // Define table actions with custom icons
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

  // Function to handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); 
  };

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, rowsPerPage]);

  return (
    <Grid container direction="column" alignItems="center" className="form-container">
      <Typography variant="h5" className="heading">
        Student Page
      </Typography>
      <Box className="button-container">
        <Tooltip title="Click to add a new student" arrow>
          <Button
            variant="outlined"
            startIcon={<AddIconButton />}
            onClick={() => openAddAndEditModal()}
          >
            ADD
          </Button>
        </Tooltip>
      </Box>
      <Box className="table-container">
        <GenericTable
          data={students}
          columns={columns}
          actions={actions}
          total={totalStudents}
          limit={rowsPerPage}
          page={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
      {/* Student modal component  */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={closeAddAndEditModal}
        onAdd={handleAddStudent}
        initialStudentData={isEmptyString(editingStudent.studentId) ? DefaultData : editingStudent}
      />
      {/* Component for delete confirmation */}
      <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
          <Button onClick={() => setDeleteConfirmationOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
  };
  
  export default Student;
  