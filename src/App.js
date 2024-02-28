import React, { useState } from "react";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import "./App.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="app-container">
      {isLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default App;
