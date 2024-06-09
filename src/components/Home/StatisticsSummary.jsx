import React, { useState, useEffect } from "react";
import {Grid, Paper, Typography, CircularProgress  } from "@mui/material";
import { getAllLendings } from "../../services/bookTransaction.service";
import DoughnutChart from "./DoughnutChart ";
import { getAllBooks } from "../../services/book.service";
import './StatisticsSummary.css'


const StatisticsSummary = () => {
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage total number of books
  const [totalBooks, setTotalBooks] = useState(0);
  // State to manage total number of available books
  const [totalAvailableBooks, setTotalAvailableBooks] = useState(0);
  // State to manage total number of issued books
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);
  // State to manage total number of overdue books
  const [totalOverdueBooks, setTotalOverdueBooks] = useState(0);
  // Effect hook to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
       // Fetch all books
         const booksResponse = await getAllBooks();
         const books = booksResponse.books; 
         setTotalBooks(books.length);

        // Fetch all lendings
        const lendings = await getAllLendings();

        // Filter lendings to get available books
        const availableBooks = books.filter(book => {
          return !lendings.some(lending => lending.bookId === book.id);
        });
        setTotalAvailableBooks(availableBooks.length);

        // Calculate issued books
        const issuedBooks = books.length - availableBooks.length;
        setTotalIssuedBooks(issuedBooks);

        // Filter lendings to get overdue books
        const overdueBooks = lendings.filter(lending => new Date(lending.dueDate) < new Date()).length;
        setTotalOverdueBooks(overdueBooks);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="statistics-summary-container">
      <Typography className="statistics-summary-title">
        College Library Dashboard
      </Typography>
      <Typography className="statistics-summary-subtitle">
        {new Date().toLocaleString()}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} className="statistics-summary-stat-container">
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="statistics-summary-stat">
              <Typography variant="body1" className="statistics-summary-label">Total Books</Typography>
              <Typography variant="h4" className="statistics-summary-value">{totalBooks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="statistics-summary-stat">
              <Typography variant="body1" className="statistics-summary-label">Available Books</Typography>
              <Typography variant="h4" className="statistics-summary-value">{totalAvailableBooks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="statistics-summary-stat">
              <Typography variant="body1" className="statistics-summary-label">Issued Books</Typography>
              <Typography variant="h4" className="statistics-summary-value">{totalIssuedBooks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="statistics-summary-stat">
              <Typography variant="body1" className="statistics-summary-label">Overdue Books</Typography>
              <Typography variant="h4" className="statistics-summary-value">{totalOverdueBooks}</Typography>
            </Paper>
          </Grid>
          <DoughnutChart 
            totalBooks={totalBooks} 
            totalAvailableBooks={totalAvailableBooks} 
            totalIssuedBooks={totalIssuedBooks} 
            totalOverdueBooks={totalOverdueBooks} 
          />
        </Grid>
      )}
    </div>
  );
};

export default StatisticsSummary;
