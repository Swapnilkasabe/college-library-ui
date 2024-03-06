import { createContext } from "react";

// context object with default values
export const AppContext = createContext({
  active: "students",
  sidebarOpen: false,
  isLogin: false,
  setIsLogin: (val) => {},
  setSidebarOpen: (val) => {},
  setActive: (val) => {},
});
