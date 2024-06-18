import React from "react";
import AppRoutes from "./routes/Routes";
import "./App.css";
import AppLayout from "./Layouts/Layouts";
import { AppContextProvider } from "./contexts/AppContext.Provider";

const App = () => {
  return (
  // Wrapping the entire application with the context provider to provide state to components
    <AppContextProvider>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AppContextProvider>
  );
};

export default App;
