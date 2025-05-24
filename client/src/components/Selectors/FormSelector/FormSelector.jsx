import { useEffect, useState } from 'react';
import './FormSelector.css'

const FormSelector = ({ saveForm }) => {
    const [forms, setForms] = useState(['Очное', 'Заочное', 'Дистанционное']);
    const [selectedForm, setSelectedForm] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = async (form) => {
        setSelectedForm(form)
        try {
            console.log('Форма обучения: ', form)
            saveForm(form);
            setIsOpen(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };


    return (
        <div className="form-selector-container" style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="form_toggle-button"
            >
                {selectedForm
                    ? `Выбрано: ${selectedForm}`
                    : 'Выбрать форму обучения'}
            </button>

            {isOpen && (
                <div className="form-selector-popup">
                    <div className="forms-list">
                        {
                            <ul>
                                {forms.map(form => (
                                    <li
                                        key={form}
                                        className={`form-item ${selectedForm === form ? 'selected' : ''}`}
                                        onClick={() => handleSave(form)}
                                    >
                                        <span className="form-name">{form}</span>
                                        {selectedForm === form && (
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

export default FormSelector;