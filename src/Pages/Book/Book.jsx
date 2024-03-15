import React, { useState } from "react";
import BookModal, { DefaultData } from "../../components/Modals/BookModal";
import GenericTable from "../../utilities/GenericTable";
import { Button } from "@mui/material";
import { isEmptyString } from "../../utilities/helper";
import "./Book.css";


const Book = () => {
  // State for storing book data
  const [books, setBooks] = useState([]);

  // State for managing the currently edited book
  const [editingBook, setEditingBook] = useState(DefaultData);

  // State for controlling the visibility of the add modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Function to open the add book modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Function to open the edit book modal
  const openEditModal = (book) => {
    setIsAddModalOpen(true);
    if (book) {
      setEditingBook({ ...book });
    }
  };
  // Function to close the add book modal
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingBook(DefaultData);
  };

  // Function to add a new book
  const handleAddBook = (isEditMode) => (newBook) => {
    if (isEditMode) {
      handleUpdateBook(newBook);
    } else {
      setBooks([...books, newBook]);
    }
    setIsAddModalOpen(false);
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
    { label: "Edit", handler: openEditModal },
    { label: "Delete", handler: handleDeleteBook },
  ];

  return (
    <div className="form-container">
      <h2>Book Details</h2>
      <div className="button-container">
        <Button onClick={openAddModal} variant="contained" color="primary">
          Add Book
        </Button>
      </div>
      {/* Display table of books */}
      <GenericTable data={books} columns={columns} actions={actions} />
      <BookModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddBook(!isEmptyString(editingBook.id))}
        initialBookData={
          isEmptyString(editingBook.id) ? DefaultData : editingBook
        }
      />
    </div>
  );
};

export default Book;
