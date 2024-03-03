import React, { useState } from "react";
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
      <AppRoutes isLogin={isLogin} toggleForm={toggleForm} />
    </div>
  );
};

export default App;
