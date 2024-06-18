import { createContext } from "react";

// context object with default values
export const AppContext = createContext({
  active: "students",
  sidebarOpen: false,
  isLogin: false,
  setIsLogin: (val) => {},
  setSidebarOpen: (val) => {},
  setActive: (val) => {},
  showNotification: false,
  notificationOptions: { message: "", severity: "info", autoClose: 5000 },
  setShowNotification: (val) => {},
  setNotificationOptions: (val) => {},
  notificationHandler: (val) => {},
});
