import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import GenericTable from '../../components/Common/GenericTable';
import { getAllStudents } from '../../services/student.service';
import { getAllBooks } from '../../services/book.service';
import { useAppContext } from '../../contexts/AppContext.Provider';
import '../../commonStyles/Pages.css';
import { getAllLendings } from '../../services/bookTransaction.service';

const StudentWiseHistory = () => {
    // State to store students data
  const [students, setStudents] = useState([]);
    // State to store books data
  const [books, setBooks] = useState([]);
    // State to store transactions data
  const [transactions, setTransactions] = useState([]);
    // Accessing notification handler from the context
  const { notificationHandler } = useAppContext();

    // State for pagination 
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
      console.error('Error fetching students', error);
      notificationHandler(true, 'Error fetching students', 'error');
    }
  };

    // Function to fetch all books
  const fetchBooks = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response.books);
    } catch (error) {
      console.error('Error fetching books', error);
      notificationHandler(true, 'Error fetching books', 'error');
    }
  };

    // Function to fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await getAllLendings();
      setTransactions(response);
    } catch (error) {
      console.error('Error fetching transactions', error);
      notificationHandler(true, 'Error fetching transactions', 'error');
    }
  };

    // Effect to fetch data on component mount 
  useEffect(() => {
    fetchStudents(paginationState.page, paginationState.rowsPerPage);
    fetchBooks();
    fetchTransactions();
  }, [paginationState.page, paginationState.rowsPerPage]);

    // Define table columns
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'studentId', label: 'Student ID' },
    { key: 'book', label: 'Book' },
    { key: 'bookId', label: 'Book ID' },
    { key: 'status', label: 'Status' },
    { key: 'issuedDate', label: 'Issued On' },
    { key: 'returnedDate', label: 'Returned On' },
  ];

    // Format data for the table
  const formattedData = students.map(student => {
    // Find the transaction for the student
    const transaction = transactions.find(t => t.studentId === student._id);
    if (!transaction) return null; 
  
    // Find the book related to the transaction
    const book = books.find(b => b._id === transaction.bookId);
    if (!book) return null; 
  
    // Format student and book IDs to show only the last 8 characters
    const formattedStudentId = student.studentId.slice(-8); 
    const formattedBookId = book.bookId.slice(-8); 

    // Format dates 
    const issuedDate = transaction.borrowedDate ? new Date(transaction.borrowedDate).toLocaleDateString() : 'N/A';
  
    const returnedDate = transaction.returnedDate ? new Date(transaction.returnedDate).toLocaleDateString() : 'N/A'; 
  
    return {
      name: student.name,
      studentId: formattedStudentId,
      book: book.title,
      bookId: formattedBookId,
      status: transaction.status,
      issuedDate: issuedDate,
      returnedDate: returnedDate,
    };
  }).filter(Boolean); 
  

  return (
    <Grid container direction="column" alignItems="center" className="form-container">
      <Typography variant="h5" className="heading">Student Transaction History</Typography>
      <Box className="table-container">
        <GenericTable
          data={formattedData}
          columns={columns}
          total={paginationState.total}
          page={paginationState.page}
          rowsPerPage={paginationState.rowsPerPage}
          showFilters={true} 
          showAddBtn={false}
          onPageChange={(newPage, rowsPerPage) => {
            setPaginationState((prevState) => ({
              ...prevState,
              page: newPage,
              rowsPerPage,
            }));
          }}
          onRowsPerPageChange={(newRowsPerPage) => {
            setPaginationState((prevState) => ({
              ...prevState,
              rowsPerPage: newRowsPerPage,
              page: 0,
            }));
          }}
        />
      </Box>
    </Grid>
  );
};

export default StudentWiseHistory;
