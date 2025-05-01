import { createContext, useContext, useState } from "react";

const MyThemeContext = createContext();


export const useMyThemeContext = () => {
  return useContext(MyThemeContext);
};

export const MyTheme = ({ children }) => {
  const [contextThemeState, setContextThemeState] = useState({});

  const updateContextThemeState = (newValue) => {
    setContextThemeState(newValue);
    localStorage.setItem("themeState", JSON.stringify(newValue));
  };

  return (
    <MyThemeContext.Provider value={{ contextThemeState, updateContextThemeState }}>
      {children}
    </MyThemeContext.Provider>
  );
};