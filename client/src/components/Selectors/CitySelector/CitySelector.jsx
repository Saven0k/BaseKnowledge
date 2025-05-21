import { useEffect, useState } from 'react';
import './CitySelector.css'
import { getCities } from '../../../services/ApiToServer/cities';


const CitySelector = ({ saveCity }) => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState([]);
    const [selectionMode, setSelectionMode] = useState('none'); // 'none', 'some', 'all'
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка городов при открытии
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

    // Обновление режима выбора при изменении selectedGroups
    useEffect(() => {
        if (selectedCity.length === 0) {
            setSelectionMode('none');
        }  else {
            setSelectionMode('some');
        }
    }, [selectedCity, cities.length]);

    const handleSave = async () => {
        try {
            console.log('Город выбран: ', selectedCity)
            saveCity(selectedCity)
            setIsOpen(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };


    return (
        <div className="city-selector-container" style={{ position: 'relative', width: '200px' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="city_toggle-button"
            >
                {selectedCity.length > 0
                        ? `Выбрано: ${selectedCity}`
                        : 'Выбрать города'}
            </button>

            {isOpen && (
                <div className="city-selector-popup">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="cities-list">
                        {isLoading ? (
                            <div className="loading">Загрузка...</div>
                        ) : filteredCities.length === 0 ? (
                            <div className="no-results">Ничего не найдено</div>
                        ) : (
                            <ul>
                                {filteredCities.map(city => (
                                    <li
                                        key={city.id}
                                        className={`city-item ${selectedCity.includes(city.name) ? 'selected' : ''}`}
                                        onClick={() => setSelectedCity(city.name)}
                                    >
                                        <span className="city-name">{city.name}</span>
                                        {selectedCity.includes(city.name) && (
                                            <span className="checkmark">✓</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
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
    );
};

export default CitySelector;