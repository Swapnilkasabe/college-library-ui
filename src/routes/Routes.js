import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";
import AppLayout from "../Layouts/Layouts";
import PasswordReset from "../components/Auth/PasswordReset/PasswordReset";
import BookStudentAssignment from "../Pages/BookStudentAssignment";
import StudentBookAssignment from "../Pages/StudentBookAssignment";
import Book from "../Pages/Book";
import Student from "../Pages/Student";
import { useAppContext } from "../contexts/AppContext.Provider";

// PrivateRoute component to handle routes that require authentication
const PrivateRoute = ({ children }) => {
  const { isLogin } = useAppContext();

  // If user is logged in, render the child components, otherwise redirect to login page
  return isLogin ? children : <Navigate to="/login" replace />;
};

// AppRoutes component defines all routes of the application
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset/:token" element={<PasswordReset />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<AppLayout />} />
        <Route path="/student" element={<Student />} />
        <Route path="/book" element={<Book />} />
        <Route
          path="/studentBookAssignment"
          element={<StudentBookAssignment />}
        />
        <Route
          path="/bookStudentAssignment"
          element={<BookStudentAssignment />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
