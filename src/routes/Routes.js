import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";
import PasswordReset from "../components/Auth/PasswordReset/PasswordReset";
import BookStudentAssignment from "../Pages/BookStudentAssignment/BookStudentAssignment";
import StudentBookAssignment from "../Pages/StudentBookAssignment/StudentBookAssignment";
import Book from "../Pages/Book/Book";
import Student from "../Pages/Student/Student";
import { useAppContext } from "../contexts/AppContext.Provider";
import Profile from "../components/profile/Profile";

// PrivateRoute component to handle routes that require authentication
const PrivateRoute = () => {
  const { isLogin } = useAppContext();

  // If user is logged in, render the child components, otherwise redirect to login page
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

// AppRoutes component defines all routes of the application
const AppRoutes = () => {
  const { isLogin } = useAppContext();
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/login"
        element={!isLogin ? <Login /> : <Navigate to="/" replace />}
      />
      <Route path="/reset/:token" element={<PasswordReset />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/student" element={<Student />} />
        <Route path="/book" element={<Book />} />
        <Route path="/issue-book" element={<StudentBookAssignment />} />
        <Route path="/assign-borrower" element={<BookStudentAssignment />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
