import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { getAllLendings } from "../../services/bookTransaction.service";
import DoughnutChart from "./DoughnutChart ";
import { getAllBooks } from "../../services/book.service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import clsx from 'clsx';
import "./StatisticsSummary.css";

const StatisticsSummary = ({ isDrawerOpen }) => {
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalAvailableBooks, setTotalAvailableBooks] = useState(0);
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);
  const [totalOverdueBooks, setTotalOverdueBooks] = useState(0);

  const fetchData = async () => {
    try {
      // Fetch all books
      const booksResponse = await getAllBooks();
      const books = booksResponse.books;
      setTotalBooks(books.length);

      // Fetch all lendings
      const lendings = await getAllLendings();
      const issuedBookIds = lendings.map((lending) => lending.bookId);

      // Calculate available books
      const availableBooks = books.filter(
        (book) => !issuedBookIds.includes(book._id)
      );
      setTotalAvailableBooks(availableBooks.length);

      setTotalIssuedBooks(issuedBookIds.length);

      // Calculate overdue books
      const overdueBooks = lendings.filter(
        (lending) => lending.dueDate && new Date(lending.dueDate) < new Date() && !lending.returnedDate
      ).length;
      setTotalOverdueBooks(overdueBooks);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Data for the bar chart
  const data = [
    { name: "Total Books", value: totalBooks },
    { name: "Available Books", value: totalAvailableBooks },
    { name: "Issued Books", value: totalIssuedBooks },
    { name: "Overdue Books", value: totalOverdueBooks },
  ];

  return (
    <div className={clsx("statistics-summary-container", { "drawer-open": isDrawerOpen })}>
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
              <Typography variant="body1" className="statistics-summary-label">
                Total Books
              </Typography>
              <Typography variant="h4" className="statistics-summary-value">
                {totalBooks}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="statistics-summary-stat">
              <Typography variant="body1" className="statistics-summary-label">
                Available Books
              </Typography>
              <Typography variant="h4" className="statistics-summary-value">
                {totalAvailableBooks}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="statistics-summary-stat">
              <Typography variant="body1" className="statistics-summary-label">
                Issued Books
              </Typography>
              <Typography variant="h4" className="statistics-summary-value">
                {totalIssuedBooks}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="statistics-summary-stat">
              <Typography variant="body1" className="statistics-summary-label">
                Overdue Books
              </Typography>
              <Typography variant="h4" className="statistics-summary-value">
                {totalOverdueBooks}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <div className="charts-container">
              <div className="pie-chart">
                <DoughnutChart
                  totalBooks={totalBooks}
                  totalAvailableBooks={totalAvailableBooks}
                  totalIssuedBooks={totalIssuedBooks}
                  totalOverdueBooks={totalOverdueBooks}
                />
              </div>
              <div className="bar-chart">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 15 }}
                      tickLine={false}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="value"
                      fill="#8884d8"
                      isAnimationActive={true}
                      animationBegin={500}
                      animationDuration={1500}
                      animationEasing="ease-in"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default StatisticsSummary;
