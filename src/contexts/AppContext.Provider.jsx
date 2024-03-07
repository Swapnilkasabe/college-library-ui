import React, { useContext, useState } from "react";
import {AppContext} from './app.context'

// Provider component for the AppContext
const AppContextProvider = ({ children }) => {
  const [active, setActive] = useState("students");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

// Storing the state variables in an object to be passed as context values
  const contextValues = {
    active,
    setActive,
    sidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin,
  };

// Providing the context values to its children components
  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the AppContext
export const useAppContext =  () =>  useContext(AppContext);

export { AppContextProvider };
