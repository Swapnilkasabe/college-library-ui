import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import BookModal, { DefaultData } from "../../components/Modals/BookModal";
import GenericTable from "../../components/Common/GenericTable";
import { isEmptyString } from "../../utilities/helper";
import {
  AddIconButton,
  DeleteIconButton,
  EditIconButton,
} from "../../components/Icons/Icons";
import { useAppContext } from "../../contexts/AppContext.Provider";

const Book = () => {
  // State for storing book data
  const { books, setBooks } = useAppContext();

  // State for managing the currently edited book
  const [editingBook, setEditingBook] = useState(DefaultData);

  // State for controlling the visibility of the add modal
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Function to open the edit book modal
  const openAddAndEditModal = (book) => {
    setIsModalOpen(true);
    if (book) {
      setEditingBook({ ...book });
    }
  };

  // Function to close the add book modal
  const closeAddAndEditModal = () => {
    setIsModalOpen(false);
    setEditingBook(DefaultData);
  };

  // Function to add a new book
  const handleAddBook = (isEditMode) => (newBook) => {
    if (isEditMode) {
      handleUpdateBook(newBook);
    } else {
      setBooks([...books, newBook]);
    }
    setIsModalOpen(false);
  };

  // Function to update a book details
  const handleUpdateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks([...updatedBooks]);
  };

  // Function to delete a book
  const handleDeleteBook = (deletedBook) => {
    setBooks(books.filter((book) => book.id !== deletedBook.id));
  };

  // Define table columns
  const columns = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "description", label: "Description" },
    { key: "id", label: "Code" },
  ];

  // Define table actions
  const actions = [
    { label: "EDIT", handler: openAddAndEditModal, icon: <EditIconButton /> },
    { label: "DEL", handler: handleDeleteBook, icon: <DeleteIconButton /> },
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
              onClick={openAddAndEditModal}
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
        onAdd={handleAddBook(!isEmptyString(editingBook.id))}
        initialBookData={
          isEmptyString(editingBook.id) ? DefaultData : editingBook
        }
      />
    </Grid>
  );
};

export default Book;
