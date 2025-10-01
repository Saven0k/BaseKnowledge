import { useEffect, useState } from 'react';
import './FormSelector.css'

const FormSelector = ({ saveForm, form }) => {
    const [forms, setForms] = useState(['Очное', 'Заочное', 'Дистанционное']);
    const [selectedForm, setSelectedForm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Сброс выбора
    useEffect(() => {
        if (form === '') {
            setSelectedForm('')
        }
    }, [form])

    // Сохранение формы
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
        <div className="form-selector">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="form-selector__toggle"
            >
                {selectedForm
                    ? `Выбрано: ${selectedForm}`
                    : 'Выбрать форму обучения'}
            </button>

            {isOpen && (
                <div className="form-selector__popup">
                    <div className="form-selector__list">
                        <ul className="form-selector__items">
                            {forms.map(form => (
                                <li
                                    key={form}
                                    className={`form-selector__item ${selectedForm === form ? 'form-selector__item--selected' : ''}`}
                                    onClick={() => handleSave(form)}
                                >
                                    <span className="form-selector__name">{form}</span>
                                    {selectedForm === form && (
                                        <span className="form-selector__checkmark">✓</span>
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

export default FormSelector;