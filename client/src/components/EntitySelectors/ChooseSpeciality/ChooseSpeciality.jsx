import { useEffect, useState } from 'react'
import './ChooseSpeciality.css'
import { getSpecialities } from '../../../services/ApiToServer/specialities'

const ChooseSpeciality = ({ saveSpeciality, saveCourse }) => {
    const [specialities, setSpecialities] = useState([])
    const [courses, setCourses] = useState([
        { name: " 1 курс", code: 1 },
        { name: " 2 курс", code: 2 },
        { name: " 3 курс", code: 3 },
        { name: " 4 курс", code: 4 },
    ])

    // Загрузка специальностей
    const loadSpecialities = async () => {
        const newSpeciality = await getSpecialities();
        setSpecialities(newSpeciality)
    }

    useEffect(() => {
        loadSpecialities()
    }, [])

    // Сохранение данных
    const saveInformation = (speciality, course) => {
        saveSpeciality(speciality)
        saveCourse(course)
    }

    return (
        <div className="choose-speciality">
            <p className="choose-speciality__title">
                Выберете специальность и курс
            </p>
            {specialities.length === 0 ? (
                <div className="choose-speciality__empty">Ничего нет</div>
            ) : (
                <div className="choose-speciality__list">
                    {specialities.map((speciality, index) => (
                        <div key={index} className="choose-speciality__item">
                            <div className="choose-speciality__name">
                                {speciality.name}
                            </div>
                            <div className="choose-speciality__courses">
                                {courses.map((course, index) => (
                                    <button
                                        key={index}
                                        onClick={() => saveInformation(speciality.name, course.code)}
                                        className="choose-speciality__button"
                                    >
                                        {course.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default ChooseSpeciality;