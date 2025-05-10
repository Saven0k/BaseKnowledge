import './CitySelector.css'


const CitySelector = ({ saveCitiesList }) => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectionMode, setSelectionMode] = useState('none'); // 'none', 'some', 'all'
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка городов при открытии
    useEffect(() => {
        if (isOpen && cities.length === 0) {
            const fetchCities = async () => {
                try {
                    setIsLoading(true);
                    const cities = await getStudentGroups()
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
        if (selectedCities.length === 0) {
            setSelectionMode('none');
        } else if (selectedCities.length === cities.length && cities.length > 0) {
            setSelectionMode('all');
        } else {
            setSelectionMode('some');
        }
    }, [selectedCities, cities.length]);

    const toggleCitySelection = (cityName) => {
        setSelectedCities(prev =>
            prev.includes(groupName)
                ? prev.filter(name => name !== cityName)
                : [...prev, cityName]
        );
    };

    const selectAllCities = () => {
        if (selectionMode === 'all') {
            setSelectedCities([]);
            setSelectionMode('none');
        } else {
            setSelectedCities(cities.map(city => city.name));
            setSelectionMode('all');
        }
    };

    const handleSave = async () => {
        try {
            let CitiesToSave = selectedCities;
            if (selectionMode === 'all') {
                CitiesToSave = 'all'; // Отправляем специальное значение
            }
            console.log('Сохраненные города:', CitiesToSave);
            saveCitiesList(CitiesToSave)
            setIsOpen(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    return (
        <div className="city-selector-container" style={{ position: 'relative', width: '200px' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="toggle-button"
            >
                {selectionMode === 'all'
                    ? 'Все города'
                    : selectedGroups.length > 0
                        ? `Выбрано: ${selectedCities.length}`
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

                    <div className="all-cities-button">
                        <button
                            onClick={selectAllCities}
                            className={selectionMode === 'all' ? 'selected' : ''}
                        >
                            {selectionMode === 'all' ? '✓ Все города' : 'Все города'}
                        </button>
                    </div>

                    <div className="cities-list">
                        {isLoading ? (
                            <div className="loading">Загрузка...</div>
                        ) : filteredGroups.length === 0 ? (
                            <div className="no-results">Ничего не найдено</div>
                        ) : (
                            <ul>
                                {filteredCities.map(city => (
                                    <li
                                        key={city.id}
                                        className={`city-item ${selectedCities.includes(city.name) ? 'selected' : ''}`}
                                        onClick={() => toggleCitySelection(city.name)}
                                    >
                                        <span className="city-name">{city.name}</span>
                                        {selectedCities.includes(city.name) && (
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