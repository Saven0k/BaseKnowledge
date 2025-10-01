import { useEffect, useState } from 'react';
import './SpecialitySelector.css'
import { getSpecialities } from '../../../services/ApiToServer/specialities';

const SpecialitySelector = ({ saveSpeciality, speciality }) => {
    const [specialities, setSpecialities] = useState([])
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [selectionMode, setSelectionMode] = useState('none');
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка специальностей
    useEffect(() => {
        if (isOpen && specialities.length === 0) {
            const fetchSpecialities = async () => {
                try {
                    const specialities = await getSpecialities()
                    setSpecialities(specialities);
                } catch (error) {
                    console.error('Ошибка при загрузке специальностей:', error);
                }
            };
            fetchSpecialities();
        };
    }, [isOpen]);

    // Сброс выбора
    useEffect(() => {
        if (speciality === '') {
            setSelectedSpeciality('')
        }
    }, [speciality])

    // Обновление режима выбора
    useEffect(() => {
        if (selectedSpeciality.length === 0) {
            setSelectionMode('none');
        } else {
            setSelectionMode('some');
        }
    }, [selectedSpeciality, specialities.length]);

    // Сохранение выбора
    const handleSave = async () => {
        try {
            saveSpeciality(selectedSpeciality)
            setIsOpen(false);
            console.log('Специальность выбрана:', selectedSpeciality);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    return (
        <div className="speciality-selector">
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className="speciality-selector__toggle"
            >
                {selectedSpeciality
                    ? `Выбрано: ${selectedSpeciality}`
                    : 'Выбрать специальность'}
            </button>

            {isOpen && (
                <div className="speciality-selector__popup">
                    <div className="speciality-selector__list">
                        <ul className="speciality-selector__items">
                            {specialities.map(speciality => (
                                <li
                                    key={speciality.id}
                                    className={`speciality-selector__item ${selectedSpeciality === speciality.name ? 'speciality-selector__item--selected' : ''}`}
                                    onClick={() => setSelectedSpeciality(speciality.name)}
                                >
                                    <span className="speciality-selector__name">{speciality.name}</span>
                                    {selectedSpeciality === speciality.name && (
                                        <span className="speciality-selector__checkmark">✓</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="speciality-selector__footer">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="speciality-selector__cancel"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={selectionMode === 'none'}
                            className="speciality-selector__save"
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default SpecialitySelector;