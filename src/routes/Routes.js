import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";
import Layouts from "../Layouts/Layouts";
import PasswordReset from "../components/Auth/PasswordReset/PasswordReset";
import BookStudentAssignment from "../Pages/BookStudentAssignment";
import StudentBookAssignment from "../Pages/StudentBookAssignment";
import Book from "../Pages/Book";
import Student from "../Pages/Student";

const AppRoutes = ({ isLogin }) => (
  <Routes>
    <Route
      path="/"
      exact
      element={
        isLogin ? (
          <>Dashboard Page Component Here</>
        ) : (
          <Navigate to={"/login"} />
        )
      }
    />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/reset/:token" element={<PasswordReset />} />
    <Route path="/home" element={<Layouts />} />
    <Route path="/student" element={<Student />} />
    <Route path="/book" element={<Book />} />
    <Route path="/studentBookAssignment" element={<StudentBookAssignment />} />
    <Route path="/bookStudentAssignment" element={<BookStudentAssignment />} />
  </Routes>
);

export default AppRoutes;
