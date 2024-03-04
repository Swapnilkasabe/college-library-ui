import React, { useState } from "react";
import AppRoutes from "./routes/Routes";
import "./App.css";
import AppLayout from "./Layouts/Layouts";

const App = () => {
  // State to manage login status
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AppLayout>
      {/* <Header /> */}
      <AppRoutes isLogin={isLogin} />
    </AppLayout>
  );
};

export default App;
