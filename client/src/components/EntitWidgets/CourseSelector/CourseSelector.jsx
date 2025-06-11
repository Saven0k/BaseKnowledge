import { useEffect, useState } from 'react';
import './CourseSelector.css'

const CourseSelector = ({ saveCourse, course }) => {
    const [courses, setCourses] = useState(['1', '2', '3', '4']);
    const [selectedCourse, setSelectedCourse] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (course === '') {
            setSelectedCourse('')
        }
    }, [course])


    const handleSave = async (course) => {
        setSelectedCourse(course)
        try {
            console.log('Курс обучения: ', course)
            saveCourse(course);
            setIsOpen(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };


    return (
        <div className="course-selector-container" style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="course_toggle-button"
            >
                {selectedCourse
                    ? `Выбрано: ${selectedCourse} курс`
                    : 'Выбрать курс'}
            </button>

            {isOpen && (
                <div className="course-selector-popup">
                    <div className="courses-list">
                        {
                            <ul>
                                {courses.map(course => (
                                    <li
                                        key={course}
                                        className={`course-item ${selectedCourse === course ? 'selected' : ''}`}
                                        onClick={() => handleSave(course)}
                                    >
                                        <span className="course-name">{course}</span>
                                        {selectedCourse === course && (
                                            <span className="checkmark">✓</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseSelector;