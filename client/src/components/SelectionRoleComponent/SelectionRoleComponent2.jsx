import './SelectionRoleComponent.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../services/MyProvider/MyProvider';
import SelectionBox from './SelectionBox/SelectionBox';
import BackButton from '../CustomButtons/BackButton/BackButton';
import ChooseCity from '../EntitySelectors/ChooseCity/ChooseCity';
import ChooseSpeciality from '../EntitySelectors/ChooseSpeciality/ChooseSpeciality';
import ChooseStudyType from '../EntitySelectors/ChooseStudyType/ChooseStudyType';
import ChooseGroup from '../EntitySelectors/ChooseGroup/ChooseGroup';
import ChooseSchoolClass from '../EntitySelectors/ChooseSchoolClass/ChooseSchoolClass';

const SelectionRoleComponent = () => {
    const [classSchool, setClassSchool] = useState(null)
    const [role, setRole] = useState(null);
    const [group, setGroup] = useState(null);
    const [city, setCity] = useState(null)
    const [studyType, setStudyType] = useState(null);
    const [levelEducation, setLevelEducation] = useState(null)
    const [speciality, setSpeciality] = useState(null)
    const [course, setCourse] = useState(null)
    const [animationClass, setAnimationClass] = useState('fade-in')
    const { contextState, updateContextState } = useMyContext();
    const navigate = useNavigate()

    useEffect(() => {
        // При каждом изменении состояния сбрасываем анимацию
        setAnimationClass('fade-out')
        setTimeout(() => {
            setAnimationClass('fade-in')
        }, 50)
    }, [role, classSchool, group, city, studyType, levelEducation, speciality, course])

    useEffect(() => {
        if (role === 'studentSchool' && classSchool !== null) {
            updateContextState('role', role)
            updateContextState('studentClass', classSchool)
            updateContextState('city', city)
            updateContextState('educationLevel', levelEducation)
            navigate('/studentSchool')
        }
    }, [role, classSchool])

    useEffect(() => {
        if ((role === 'studentCollege' || role === 'studentUniversity') && group !== null && city !== null) {
            updateContextState('role', role)
            updateContextState('city', city)
            updateContextState('studyType', studyType)
            updateContextState('course', course)
            updateContextState('group', group)
            updateContextState('speciality', speciality)
            updateContextState('educationLevel', levelEducation)
            navigate('/student')
        }
    }, [role, group])

    useEffect(() => {
        if (role === 'teacherSchool' || role === 'teacherCollege' || role === 'teacherUniversity'){
            navigate('/login')
        }
    }, [role])

    const renderContent = () => {
        if (levelEducation === null) {
            return (
                <div className="levelEducation__box box">
                    <SelectionBox 
                        title={"Школа"} 
                        setEducationLevel={setLevelEducation} 
                        setRole={setRole} 
                        roleList={[
                            { title: "studentSchool", role: "Ученик" }, 
                            { title: "teacherSchool", role: "Преподаватель" }, 
                            { title: "curatorSchool", role: "Куратор" }, 
                            { title: "parantSchool", role: "Родитель" }
                        ]} 
                    />
                    <SelectionBox 
                        title={"Колледж"} 
                        setEducationLevel={setLevelEducation} 
                        setRole={setRole} 
                        roleList={[
                            { title: "studentCollege", role: "Студент" }, 
                            { title: "teacherCollege", role: "Преподаватель" }, 
                            { title: "curatorCollege", role: "Куратор" }, 
                            { title: "parantCollege", role: "Родитель" }
                        ]} 
                    />
                    <SelectionBox 
                        title={"Университет"} 
                        setEducationLevel={setLevelEducation} 
                        setRole={setRole} 
                        roleList={[
                            { title: "studentUniversity", role: "Студент" }, 
                            { title: "teacherUniversity", role: "Преподаватель" }, 
                            { title: "curatorUniversity", role: "Куратор" }, 
                            { title: "parantUniversity", role: "Родитель" }
                        ]} 
                    />
                </div>
            )
        }
        if (role === 'studentSchool' && classSchool === null) {
            return (
                <div className="classes_box box">
                    <ChooseSchoolClass saveSchoolClass={setClassSchool} />
                    <BackButton setRole={setRole} />
                </div>
            )
        }
        if (role !== null && levelEducation !== null && city === null) {
            return (
                <div className="city_box box"> 
                    <ChooseCity saveCity={setCity} />
                    <BackButton setRole={setLevelEducation} />
                </div>
            )
        }
        if (city !== null && role !== null && levelEducation !== null && speciality === null) {
            return (
                <div className="speciality_box box">
                    <ChooseSpeciality saveSpeciality={setSpeciality} saveCourse={setCourse} />
                    <BackButton setRole={setCity} />
                </div>
            )
        }
        if (course !== null && city !== null && role !== null && levelEducation !== null && studyType === null) {
            return (
                <div className="studyType_box box">
                    <ChooseStudyType saveStudyType={setStudyType} />
                    <BackButton setRole={setSpeciality} />
                </div>
            )
        }
        if (course !== null && city !== null && (role === 'studentCollege' || role === 'studentUniversity') && levelEducation !== null && studyType !== null && group === null) {
            return (
                <div className="group_box box">
                    <ChooseGroup saveGroup={setGroup} type={role} course={course} studyType={studyType} speciality={speciality}/>
                    <BackButton setRole={setStudyType} />
                </div>
            )
        }
        return null;
    }

    return (
        <div className={`selection-container ${animationClass}`}>
            {renderContent()}
        </div>
    )
}

export default SelectionRoleComponent;