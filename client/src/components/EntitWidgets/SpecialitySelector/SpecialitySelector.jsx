import { useEffect, useState } from 'react';
import './SpecialitySelector.css'
import { getSpecialities } from '../../../services/ApiToServer/specialities';

const SpecialitySelector = ({saveSpeciality, speciality}) => {
    const [specialities, setSpecialities] = useState([])
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [selectionMode, setSelectionMode] = useState('none');
    const [isOpen, setIsOpen] = useState(false);

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

    useEffect(() => {
        if (speciality === '') {
            setSelectedSpeciality('')
        }
    }, [speciality])

    useEffect(() => {
        if (selectedSpeciality.length === 0) {
            setSelectionMode('none');
        } else {
            setSelectionMode('some');
        }
    }, [selectedSpeciality, specialities.length]);

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
        <div className="speciality-selector-container" style={{ position: 'relative', width: '200px' }}>
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className="speciality_toggle-button "
            >
                {selectedSpeciality
                    ? `Выбрано: ${selectedSpeciality}`
                    : 'Выбрать специальность'}
            </button>

            {isOpen && (
                <div className="speciality-selector-popup">
                    <div className="specialities-list">
                        <ul>
                            {specialities.map(speciality => (
                                <li
                                    key={speciality.id}
                                    className={`speciality-item ${selectedSpeciality.includes(speciality.name) ? 'selected' : ''}`}
                                    onClick={() => setSelectedSpeciality(speciality.name)}
                                >
                                    <span className="speciality-name">{speciality.name}</span>
                                    {selectedSpeciality.includes(speciality.name) && (
                                        <span className="checkmark">✓</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="popup-footer">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="cancel-button"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={selectionMode === 'none'}
                            className="save-button"
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