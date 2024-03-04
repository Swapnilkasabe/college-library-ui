import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";
import PasswordReset from "../components/Auth/PasswordReset/PasswordReset";

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
  </Routes>
);

export default AppRoutes;
