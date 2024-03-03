import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import PasswordReset from "../components/Auth/PasswordReset";

const AppRoutes = ({ isLogin, toggleForm }) => (
  <Routes>
    <Route
      path="/"
      element={
        isLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Signup toggleForm={toggleForm} />
        )
      }
    />
    <Route path="/signup" element={<Signup toggleForm={toggleForm} />} />
    <Route path="/login" element={<Login toggleForm={toggleForm} />} />
    <Route path="/reset/:token" element={<PasswordReset />} />
  </Routes>
);

export default AppRoutes;
