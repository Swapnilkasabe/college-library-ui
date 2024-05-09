import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import BookModal, { DefaultData } from "../../components/Modals/BookModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import {
  AddIconButton,
  DeleteIconButton,
  EditIconButton,
} from "../../components/Icons/Icons";
import { useAppContext } from "../../contexts/AppContext.Provider";
import { createBook, deleteBook, getAllBooks, updateBook } from "../../services/book.service";
import { bookUpdateValidation, bookCreationValidation } from "../../utilities/formValidation";
import BookIssuanceModal from "../../components/Modals/BookIssuanceModal";

const Book = () => {
  // State for storing book data
  const { books, setBooks } = useAppContext();

  // State for managing the currently edited book
  const [editingBook, setEditingBook] = useState(DefaultData);

  // State for controlling the visibility of the add modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  //State for controlling the visibilty of the delete confirmation dialog
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  //State for managing the delete book operation
  const [deletingBook, setDeletingBook] = useState(null);

  // Effect to fetch books on component mount
  useEffect(() => {


    fetchBooks();
  }, []);


  // Function to fetch books
  const fetchBooks = async () => {
      try {
        const {books} = await getAllBooks();
        setBooks(books);
      } catch (error) {
        console.error("Error fetching books", error);
      }
  }
  const openAddAndEditModal = (book) => {
    setIsModalOpen(true);
      setEditingBook(!isEmptyString(book?.bookId) ? book : DefaultData);
  };

  const closeAddAndEditModal = () => {
    setIsModalOpen(false);
    setEditingBook(DefaultData);
  };

  // Function to add a new book
  const handleAddBook = async (newBook) => {
    try {
      let response;

      if (newBook?._id) {
        const {errors, isError} = bookUpdateValidation(newBook);
        if (isError) {
          throw new Error("Validation error:", errors);
        }
        response = await handleUpdateBook(newBook);
      } else {
        const {errors, isError} = bookCreationValidation(newBook);
        if (isError) {
          throw new Error("Validation error:", errors);
        }
        response = await createBook(newBook);
      }

      if (response && response.errors && response.errors.length > 0) {
        console.error("Validation errors:", response.errors);
        return;
      }
      await fetchBooks();
    }
     catch (error) {
      console.error("error adding book", error);
    }
    setIsModalOpen(false);

  }

  // Function to update a book 
  const handleUpdateBook = async (updatedBook) => {
    try {
      const {errors, isError} = bookUpdateValidation(updatedBook);
      if (isError) {
        throw new Error("Validation error:", errors);
        console.error("Validation error:", errors);
      }
      await updateBook(updatedBook.bookId, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book", error);
    }
   
  }
  // Function to delete a book
  const handleDeleteBook = async (deletedBook) => {
    const { bookId } = deletedBook; 
    setDeletingBook(bookId);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteBook(deletingBook);  
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book', error);
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
    { handler: openAddAndEditModal, icon: <EditIconButton /> },
    { handler: handleDeleteBook, icon: <DeleteIconButton /> },
  ];

  return (
    <Grid
    container
    justifyContent="center"
    alignItems="center"
    className="form-container"
  >
    <Typography variant="h5" className="heading">Book Page</Typography>

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
          <GenericTable data={books} columns={columns} actions={actions} />
          </Box>
      </Grid>
      <BookModal
        isOpen={isModalOpen}
        onClose={closeAddAndEditModal}
        onAdd={handleAddBook}
        initialBookData={
          isEmptyString(editingBook.bookId) ? DefaultData : editingBook
        }
      />
      <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
  <DialogTitle>Delete Book</DialogTitle>
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

export default Book;
