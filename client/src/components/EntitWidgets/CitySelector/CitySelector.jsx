import { useEffect, useState } from 'react';

import './CitySelector.css'
import { getCities } from '../../../services/ApiToServer/cities';

const CitySelector = ({ saveCity }) => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState([]);
    const [selectionMode, setSelectionMode] = useState('none');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка городов
    useEffect(() => {
        if (isOpen && cities.length === 0) {
            const fetchCities = async () => {
                try {
                    setIsLoading(true);
                    const cities = await getCities()
                    setCities(cities);
                    setFilteredCities(cities);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Ошибка при загрузке городов:', error);
                    setIsLoading(false);
                }
            };
            fetchCities();
        }
    }, [isOpen]);

    // Фильтрация городов
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCities(cities);
        } else {
            const filtered = cities.filter(city =>
                city.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCities(filtered);
        }
    }, [searchTerm, cities]);

    // Обновление режима выбора
    useEffect(() => {
        if (selectedCity.length === 0) {
            setSelectionMode('none');
        } else {
            setSelectionMode('some');
        }
    }, [selectedCity, cities.length]);

    // Сохранение выбора
    const handleSave = async () => {
        try {
            saveCity(selectedCity)
            setIsOpen(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    return (
        <div className="city-selector">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="city-selector__toggle"
            >
                {selectedCity.length > 0
                    ? `Выбрано: ${selectedCity}`
                    : 'Выбрать город'}
            </button>

            {isOpen && (
                <div className="city-selector__popup">
                    <div className="city-selector__search">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            className="city-selector__search-input"
                        />
                    </div>

                    <div className="city-selector__list">
                        {isLoading ? (
                            <div className="city-selector__loading">Загрузка...</div>
                        ) : filteredCities.length === 0 ? (
                            <div className="city-selector__empty">Ничего не найдено</div>
                        ) : (
                            <ul className="city-selector__items">
                                {filteredCities.map(city => (
                                    <li
                                        key={city.id}
                                        className={`city-selector__item ${selectedCity.includes(city.name) ? 'city-selector__item--selected' : ''}`}
                                        onClick={() => setSelectedCity(city.name)}
                                    >
                                        <span className="city-selector__name">{city.name}</span>
                                        {selectedCity.includes(city.name) && (
                                            <span className="city-selector__checkmark">✓</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="city-selector__footer">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="city-selector__cancel"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={selectionMode === 'none'}
                            className="city-selector__save"
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CitySelector;