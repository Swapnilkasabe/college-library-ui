import React, { useContext, useState } from "react";
import {AppContext} from './app.context'
import CustomSnackbar from "../utilities/CustomSnackbar";

// Provider component for the AppContext
const AppContextProvider = ({ children }) => {
  const [active, setActive] = useState("students"); // State for the currently active section
  const [sidebarOpen, setSidebarOpen] = useState(true); // State for sidebar visibility
  const [isLogin, setIsLogin] = useState(false); // State for user login status
  const [showNotification, setShowNotification] = useState(false); // State for showing notifications
  const [notificationOptions, setNotificationOptions] = useState(defaultNotificationOptions); // State for notification options

    // Function to handle notification display
  const notificationHandler = (flag, message, severity, autoClose = 5000 ) =>{
    setShowNotification(flag);
    setNotificationOptions({message: message, severity: severity, autoClose: autoClose});
  } 

   // Function to handle notification close
  const notificationCloseHandler = () =>{
    setShowNotification(false);
    setNotificationOptions(defaultNotificationOptions);
  }
// Storing the state variables in an object to be passed as context values
  const contextValues = {
    active,
    setActive,
    sidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin,
    showNotification,
    setShowNotification,
    notificationOptions,
    setNotificationOptions,
    notificationHandler
  };

// Providing the context values to its children components
  return (
    <AppContext.Provider value={contextValues}>
      {children}
      <CustomSnackbar
      open={showNotification}
      onClose={notificationCloseHandler}
      options={notificationOptions}
      />
    </AppContext.Provider>
  );
};

// Custom hook to access the AppContext
export const useAppContext =  () =>  useContext(AppContext);
export const defaultNotificationOptions = { message: "", severity: "info", autoClose: 5000}
export { AppContextProvider };
