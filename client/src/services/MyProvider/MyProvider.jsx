import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};
export const MyProvider = ({ children }) => {
  const [contextState, setContextState] = useState({
    role:'',
    city:'',
    email:''
  });

  const updateContextState = (name, newValue) => {
    setContextState({...contextState, [name]: newValue});
  };

  console.log(contextState)

  return (
    <MyContext.Provider value={{ contextState, updateContextState }}>
      {children}
    </MyContext.Provider>
  );
};