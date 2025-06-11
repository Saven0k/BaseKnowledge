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

    const preparationSpeciality = async () => {
        const newSpeciality = await getSpecialities();
        setSpecialities(newSpeciality)
    }

    useEffect(() => {
        preparationSpeciality()
    }, [])

    const saveInformation = (speciality, course) => {
        saveSpeciality(speciality)
        saveCourse(course)
    }
    return (
        <div className="choose_speciality">
            <p className="choose_title">
                Выберете специальность и курс
            </p>
            {
                specialities.length === 0 ?
                    <div className="p">Ничего нет</div>
                    :
                    <div className="speciality_list">
                        {
                            specialities.map((speciality, index) => (
                                <div key={index} className="speciality_box">
                                    <div className="speciality_title">
                                        {speciality.name}
                                    </div>
                                    <div className="course_buttons">
                                        {
                                            courses.map((course, index) => (
                                                <button key={index} onClick={() => saveInformation(speciality.name, course.code)} className="specialitiy_box">
                                                    {course.name}
                                                </button>

                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}
export default ChooseSpeciality;