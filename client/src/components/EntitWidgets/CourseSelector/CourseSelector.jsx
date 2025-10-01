import { useEffect, useState } from 'react';
import './CourseSelector.css'

const CourseSelector = ({ saveCourse, course }) => {
    const [courses, setCourses] = useState(['1', '2', '3', '4']);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Сброс выбора
    useEffect(() => {
        if (course === '') {
            setSelectedCourse('')
        }
    }, [course])

    // Сохранение курса
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
        <div className="course-selector">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="course-selector__toggle"
            >
                {selectedCourse
                    ? `Выбрано: ${selectedCourse} курс`
                    : 'Выбрать курс'}
            </button>

            {isOpen && (
                <div className="course-selector__popup">
                    <div className="course-selector__list">
                        <ul className="course-selector__items">
                            {courses.map(course => (
                                <li
                                    key={course}
                                    className={`course-selector__item ${selectedCourse === course ? 'course-selector__item--selected' : ''}`}
                                    onClick={() => handleSave(course)}
                                >
                                    <span className="course-selector__name">{course} курс</span>
                                    {selectedCourse === course && (
                                        <span className="course-selector__checkmark">✓</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseSelector;