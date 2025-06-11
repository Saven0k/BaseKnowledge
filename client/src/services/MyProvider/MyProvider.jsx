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
    const savedGroup = localStorage.getItem('group') || '';
    const savedStudyType = localStorage.getItem('studyType') || '';
    const savedEducationLevel = localStorage.getItem('educationLevel') || '';
    const savedCourse = localStorage.getItem('course') || '';
    const savedSchoolClass = localStorage.getItem('schoolClass') || '';
    const savedSpeciality = localStorage.getItem('speciality') || '';


    return {
      role: savedRole,
      city: savedCity,
      email: savedEmail,
      group: savedGroup,
      studyType: savedStudyType,
      course: savedCourse,
      speciality: savedSpeciality,
      educationLevel: savedEducationLevel,
      schoolClass: savedSchoolClass,
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
    setContextState({ ...contextState, 
        role: localStorage.getItem('role'),
        city: localStorage.getItem('city'), 
        email: localStorage.getItem('email'), 
        group: localStorage.getItem('group'),
        studyType: localStorage.getItem('studyType'),
        course: localStorage.getItem('course'),
        educationLevel: localStorage.getItem('educationLevel'),
        schoolClass: localStorage.getItem('schoolClass'),
        speciality: localStorage.getItem('speciality')
      })
  }, [])

  // console.log(contextState)

  return (
    <MyContext.Provider value={{ contextState, updateContextState }}>
      {children}
    </MyContext.Provider>
  );
};