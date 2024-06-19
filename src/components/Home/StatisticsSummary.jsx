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

import "./StatisticsSummary.css";

const StatisticsSummary = () => {
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalAvailableBooks, setTotalAvailableBooks] = useState(0);
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);
  const [totalOverdueBooks, setTotalOverdueBooks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await getAllBooks();
        const books = booksResponse.books;
        setTotalBooks(books.length);

        const lendings = await getAllLendings();
        const issuedBookIds = lendings.map((lending) => lending.bookId);

        const availableBooks = books.filter(
          (book) => !issuedBookIds.includes(book._id)
        );
        setTotalAvailableBooks(availableBooks.length);

        const issuedBooks = books.length - availableBooks.length;
        setTotalIssuedBooks(issuedBooks);

        const overdueBooks = lendings.filter(
          (lending) => new Date(lending.dueDate) < new Date()
        ).length;
        setTotalOverdueBooks(overdueBooks);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: "Total Books", value: totalBooks },
    { name: "Available Books", value: totalAvailableBooks },
    { name: "Issued Books", value: totalIssuedBooks },
    { name: "Overdue Books", value: totalOverdueBooks },
  ];

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
        <Grid
          container
          spacing={2}
          className="statistics-summary-stat-container"
        >
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
