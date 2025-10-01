import './SelectionRoleComponent.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../services/MyProvider/MyProvider';
import BackButton from '../CustomButtons/BackButton/BackButton';
import ChooseCity from '../EntitySelectors/ChooseCity/ChooseCity';
import ChooseSpeciality from '../EntitySelectors/ChooseSpeciality/ChooseSpeciality';
import ChooseStudyType from '../EntitySelectors/ChooseStudyType/ChooseStudyType';
import ChooseGroup from '../EntitySelectors/ChooseGroup/ChooseGroup';

const SelectionRoleComponent = () => {
    const [group, setGroup] = useState(null);
    const [city, setCity] = useState(null)
    const [studyType, setStudyType] = useState(null);
    const [speciality, setSpeciality] = useState(null)
    const [course, setCourse] = useState(null)
    const [animationClass, setAnimationClass] = useState('fade-in')
    const [currentStep, setCurrentStep] = useState(0); // 0: город, 1: форма обучения, 2: специальность, 3: группа
    const { updateContextState } = useMyContext();
    const navigate = useNavigate()


    useEffect(() => {
        if (group !== null && city !== null && studyType !== null && speciality !== null) {
            updateContextState('city', city)
            updateContextState('studyType', studyType)
            updateContextState('course', course)
            updateContextState('group', group)
            updateContextState('speciality', speciality)
            updateContextState('speciality', "student")
            localStorage.setItem("user", {group: group, studyType:studyType, city: city, speciality: speciality, course: course})
            navigate('/student')
        }
    }, [group])

    // Обработчик назад
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Обработчики сохранения данных
    const handleSaveCity = (selectedCity) => {
        setCity(selectedCity);
        setCurrentStep(1);
    };

    const handleSaveStudyType = (selectedStudyType) => {
        setStudyType(selectedStudyType);
        setCurrentStep(2);
    };

    const handleSaveSpeciality = (selectedSpeciality) => {
        setSpeciality(selectedSpeciality);
    };

    const handleSaveCourse = (selectedCourse) => {
        setCourse(selectedCourse);
        setCurrentStep(3);
    };

    const handleSaveGroup = (selectedGroup) => {
        setGroup(selectedGroup);
    };

    const renderContent = () => {
        return (
            <>
                {currentStep === 0 && (
                    <ChooseCity saveCity={handleSaveCity} />
                )}

                {currentStep === 1 && (
                    <>
                        <ChooseStudyType saveStudyType={handleSaveStudyType} />
                        <BackButton onClick={handleBack} />
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <ChooseSpeciality
                            saveSpeciality={handleSaveSpeciality}
                            saveCourse={handleSaveCourse}
                        />
                        <BackButton onClick={handleBack} />
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <ChooseGroup
                            saveGroup={handleSaveGroup}
                            type="studentCollege"
                            course={course}
                            speciality={speciality}
                            studyType={studyType}
                        />
                        <BackButton onClick={handleBack} />
                    </>
                )}


            </>
        );
    };

    return (
        <div className={`selection-container ${animationClass}`}>
            {renderContent()}
        </div>
    )
}

export default SelectionRoleComponent;