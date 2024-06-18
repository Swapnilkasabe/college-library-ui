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
import BookModal, { DefaultData } from "../../components/Modals/BookModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import {
  AddIconButton,
  DeleteIconButton,
  EditIconButton,
} from "../../components/Icons/Icons";
import { useAppContext } from "../../contexts/AppContext.Provider";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../../services/book.service";
import {
  bookUpdateValidation,
  bookCreationValidation,
} from "../../utilities/formValidation";
import "../../commonStyles/Pages.css";

const Book = () => {
  // State for storing book data
  const [books, setBooks] = useState([]);
  // State for managing the currently edited book
  const [editingBook, setEditingBook] = useState(DefaultData);
  // State for controlling the visibility of the add modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //State for controlling the visibilty of the delete confirmation dialog
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  //State for managing the delete book operation
  const [deletingBook, setDeletingBook] = useState(null);
  // State for managing the total number of students
  const [totalBooks, setTotalBooks] = useState(0);
  // State for managing the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // State for managing the number of rows per page
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // State for managing the total number of pages
  const [pageCount, setPageCount] = useState(0);

  // Access state from context for displaying notification
  const { notificationHandler } = useAppContext();

  // Effect to fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, [currentPage, rowsPerPage]);

  // Function to fetch books
  const fetchBooks = async () => {
    try {
      const { books, total } = await getAllBooks(currentPage, rowsPerPage);
      setBooks(books);
      setTotalBooks(total);
      const calculatedPageCount = Math.ceil(total / rowsPerPage);
      setPageCount(calculatedPageCount);
    } catch (error) {
      console.error("Error fetching books", error);
      notificationHandler(true, "Error fetching books", "error");
    }
  };

  // Function to open add and edit modal
  const openAddAndEditModal = (book) => {
    setIsModalOpen(true);
    setEditingBook(!isEmptyString(book?.bookId) ? book : DefaultData);
  };

  // Function to close add and edit modal
  const closeAddAndEditModal = () => {
    setIsModalOpen(false);
    setEditingBook(DefaultData);
  };

  // Function to add and update book
  const handleAddBook = async (newBook) => {
    try {
      let response;
      if (newBook?._id) {
        const { errors, isError } = bookUpdateValidation(newBook);
        if (isError) {
          notificationHandler(true, "Validation error: " + errors, "error");
          return;
        }
        response = await updateBook(newBook.bookId, newBook);
      } else {
        const { errors, isError } = bookCreationValidation(newBook);
        if (isError) {
          notificationHandler(true, "Validation error: " + errors, "error");
          return;
        }
        response = await createBook(newBook);
      }

      if (response?.errors?.length > 0) {
        console.error("Validation errors:", response.errors);
        notificationHandler(true, "Validation errors occurred", "error");
        return;
      }

      const successMessage = newBook?._id
        ? "Successfully updated book"
        : "Successfully added book";
      notificationHandler(true, successMessage, "success");

      fetchBooks();
      closeAddAndEditModal();
    } catch (error) {
      console.error("Error adding/updating book", error);
      notificationHandler(true, "Error adding/updating book", "error");
    }
  };

  // Function to delete a book
  const handleDeleteBook = (book) => {
    setDeletingBook(book.bookId);
    setDeleteConfirmationOpen(true);
  };

  // Function for delete confirmation
  const confirmDelete = async () => {
    try {
      await deleteBook(deletingBook);
      // Filter the deleted book from the current state
      setBooks(books.filter((item) => item.bookId !== deletingBook));
      // Show success notification
      notificationHandler(true, "Successfully deleted book", "success");
    } catch (error) {
      console.error("Error deleting book", error);
      notificationHandler(true, "Error deleting book", "error");
    }
    setDeleteConfirmationOpen(false);
  };

  // Define table columns
  const columns = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "description", label: "Description" },
    { key: "bookId", label: "ID" },
  ];

  // Define table actions
  const actions = [
    {
      handler: openAddAndEditModal,
      icon: <EditIconButton />,
      tooltip: "Edit Book",
    },
    {
      handler: handleDeleteBook,
      icon: <DeleteIconButton />,
      tooltip: "Delete Book",
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

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="form-container"
    >
      <Typography variant="h5" className="heading">
        Book Page
      </Typography>
      <Box className="button-container">
        <Tooltip title="Click to add a new book" arrow>
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
          data={books}
          columns={columns}
          actions={actions}
          total={totalBooks}
          limit={rowsPerPage}
          page={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
      {/* Book modal component  */}
      <BookModal
        isOpen={isModalOpen}
        onClose={closeAddAndEditModal}
        onAdd={handleAddBook}
        initialBookData={
          isEmptyString(editingBook.bookId) ? DefaultData : editingBook
        }
      />
      {/* Component for delete confirmation */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Delete Book</DialogTitle>
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

export default Book;
