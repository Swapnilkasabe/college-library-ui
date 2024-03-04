import React, { useState } from "react";
import "./App.css";
import Header from "./components/Layouts/Components/Header";
import AppRoutes from "./routes/Routes";

const App = () => {
  // State to manage login status
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <Header />
      <AppRoutes isLogin={isLogin} />
    </div>
  );
};

export default App;
