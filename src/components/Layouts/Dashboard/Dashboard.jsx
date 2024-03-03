import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Student from "./Pages/Student";
import Book from "./Pages/Book";
import BookLending from "./Pages/BookLending";
import StudentBookAssignment from "./Pages/StudentBookAssignment";
import BookStudentAssignment from "./Pages/BookStudentAssignment";
import "./Dashboard.css";

// Dashboard component renders the main layout of the application, including the sidebar navigation and content display.
const Dashboard = () => {
  // State variables to manage the active sidebar item and sidebar open/close state
  const [active, setActive] = useState("students");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        {/* Sidebar component for navigation  */}
        <Sidebar
          active={active}
          setActive={setActive}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Content area for rendering different components based on the active sidebar item */}
        <div className="dashboard-option-content">
          {active === "student" && (
            <div className="dashboard-student-content">
              <Student />
            </div>
          )}
          {active === "book" && (
            <div className="dashboard-book-content">
              <Book />
            </div>
          )}
          {active === "bookLending" && (
            <div className="dashboard-bookLending-content">
              <BookLending />
            </div>
          )}
          {active === "studentPage" && (
            <div className="dashboard-student-page-content">
              <StudentBookAssignment />
            </div>
          )}
          {active === "bookPage" && (
            <div className="dashboard-book-page-content">
              <BookStudentAssignment />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
