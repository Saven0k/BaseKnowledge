import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};
export const MyProvider = ({ children }) => {
  const [contextState, setContextState] = useState(() => {
    // Получаем сохраненные значения из localStorage
    const savedRole = localStorage.getItem('role') || '';
    const savedCity = localStorage.getItem('city') || '';
    const savedEmail = localStorage.getItem('email') || '';

    return {
      role: savedRole,
      city: savedCity,
      email: savedEmail
    };
  });

  const updateContextState = (name, newValue) => {
    setContextState(prevState => {
      const updatedState = { ...prevState, [name]: newValue };

      // Сохраняем в localStorage
      localStorage.setItem(name, newValue);

      return updatedState;
    });
  };

  useEffect(() => {
    setContextState({...contextState, role: localStorage.getItem('role'), city: localStorage.getItem('city'), email: localStorage.getItem('email')})
  }, [])

  console.log(contextState)

  return (
    <MyContext.Provider value={{ contextState, updateContextState }}>
      {children}
    </MyContext.Provider>
  );
};