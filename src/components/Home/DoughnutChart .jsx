import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import { Grid, Paper, Typography } from '@mui/material';
import './DoughnutChart.css';

// Define colors for the chart segments
const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

// Custom tooltip component for displaying data on hover
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const DoughnutChart = ({ totalBooks, totalAvailableBooks, totalIssuedBooks, totalOverdueBooks }) => {
  const data = useMemo(() => ([
    { name: 'Total Books', value: totalBooks },
    { name: 'Available Books', value: totalAvailableBooks },
    { name: 'Issued Books', value: totalIssuedBooks },
    { name: 'Overdue Books', value: totalOverdueBooks },
  ]), [totalBooks, totalAvailableBooks, totalIssuedBooks, totalOverdueBooks]);

  return (
   
      <Paper className="chart-container">
        <Typography variant="h6" className="chart-title">
          Books Overview
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '13px',  textTransform: 'capitalize' }} />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

  );
};

export default DoughnutChart;
