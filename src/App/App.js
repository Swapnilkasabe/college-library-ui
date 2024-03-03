import React, { useState } from "react";
import Header from "../components/Layouts/Components/Header.jsx";
import AppRoutes from "../routes";
import "./App.css";

const App = () => {
  // State to manage login status
  const [isLogin, setIsLogin] = useState(true);

  // Function to toggle login status
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <Header />
      <AppRoutes isLogin={isLogin} toggleForm={toggleForm} />
    </div>
  );
};

export default App;
