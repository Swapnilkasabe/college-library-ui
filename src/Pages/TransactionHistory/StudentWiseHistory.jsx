import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import StudentModal, { DefaultData } from "../../components/Modals/StudentModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import { AddIconButton, DeleteIconButton, EditIconButton } from "../../components/Icons/Icons";
import { studentCreationValidation, studentUpdateValidation } from "../../utilities/formValidation";
import { createStudent, deleteStudent, getAllStudents, updateStudent } from "../../services/student.service";
import { useAppContext } from "../../contexts/AppContext.Provider";
import "../../commonStyles/Pages.css";

const StudentWiseHistory = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(DefaultData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);

  const { notificationHandler } = useAppContext();

  const [paginationState, setPaginationState] = useState({
    total: 0,
    page: 0,
    rowsPerPage: 2,
  });

  const fetchStudents = async (page, rowsPerPage) => {
    try {
      const response = await getAllStudents(page, rowsPerPage);
      const { students, totalStudentsCount } = response;
      setStudents(students);
      setPaginationState((prevState) => ({
        ...prevState,
        total:totalStudentsCount,
      }));
    } catch (error) {
      console.error("Error fetching students", error);
      notificationHandler(true, "Error fetching students", "error");
    }
  };

  useEffect(() => {

    fetchStudents(paginationState.page, paginationState.rowsPerPage);
  }, [paginationState.page, paginationState.rowsPerPage]);

  const openAddAndEditModal = (student) => {
    setIsModalOpen(true);
    setEditingStudent(
      !isEmptyString(student?.studentId) ? student : DefaultData
    );
  };

  const closeAddAndEditModal = () => {
    setIsModalOpen(false);
    setEditingStudent(DefaultData);
  };

  const handleAddStudent = async (newStudent) => {
    try {
      let response;
      if (newStudent?._id) {
        const { errors, isError } = studentUpdateValidation(newStudent);
        if (isError) {
          notificationHandler(
            true,
            "Validation error: " + JSON.stringify(errors),
            "error"
          );
          return;
        }
        response = await updateStudent(newStudent.studentId, newStudent);
      } else {
        const { errors, isError } = studentCreationValidation(newStudent);
        if (isError) {
          notificationHandler(
            true,
            "Validation error: " + JSON.stringify(errors),
            "error"
          );
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

      fetchStudents(paginationState.page, paginationState.rowsPerPage);
      closeAddAndEditModal();
    } catch (error) {
      console.error("Error adding/updating student", error);
      notificationHandler(true, "Error adding/updating student", "error");
    }
  };

  const handleDeleteStudent = (student) => {
    setDeletingStudent(student.studentId);
    setDeleteConfirmationOpen(true);
  };

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

  const columns = [
    { key: "name", label: "Name" },
    { key: "studentId", label: "St ID" },
    { key: "book", label: "Book" },
    { key: "bookId", label: "Book ID" },
    { key: "status", label: "Status" },
    { key: "returnedDate", label: "Issued/Returned Date" },

  ];

 

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="form-container"
    >
      <Typography variant="h5" className="heading" >
        Student Page
      </Typography>
      <Box className="table-container">
      <GenericTable
          data={students}
          columns={columns}
          total={paginationState.total}
          page={paginationState.page}
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

export default StudentWiseHistory;