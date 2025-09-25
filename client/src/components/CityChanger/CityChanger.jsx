import { useEffect, useState } from 'react';
import './CityChanger.css';
import { getCities } from '../../services/ApiToServer/cities';
import { useMyContext } from '../../services/MyProvider/MyProvider';


const CityChanger = () => {
    const { updateContextState } = useMyContext();

    const [selectedCity, setSelectedCity] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Загружает список городов из API
     */
    const loadCities = async () => {
        try {
            setIsLoading(true);
            const downloadCities = await getCities();
            setCities(downloadCities);
        } catch (error) {
            console.error('Ошибка при загрузке городов:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Обрабатывает выбор города пользователем
     * @param {string} city - Название выбранного города
     */
    const handleCitySelect = (city) => {
        // Закрываем меню выбора
        setIsOpen(false);

        // Если выбран вариант "Не выбрано", очищаем выбор
        if (city === 'none') {
            setSelectedCity('');
            return;
        }

        // Устанавливаем выбранный город
        setSelectedCity(city);
    };

    /**
     * Переключает состояние открытия/закрытия меню выбора города
     */
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Эффект для загрузки сохраненного города при монтировании компонента
    useEffect(() => {
        const savedCity = localStorage.getItem('city');
        setSelectedCity(savedCity ?? '');
    }, []);

    // Эффект для загрузки городов при открытии меню
    useEffect(() => {
        if (isOpen && cities.length === 0) {
            loadCities();
        }
    }, [isOpen, cities.length]);

    /**
     * Рендерит выпадающий список для выбора города
     */
    const renderCitySelect = () => {
        return (
            <div className="city-changer__select-menu">
                <select
                    className='city-changer__select'
                    onChange={(e) => handleCitySelect(e.target.value)}
                    value={selectedCity || 'none'}
                    disabled={isLoading}
                >
                    <option value="none">Не выбрано</option>
                    {cities.map(city => (
                        <option
                            value={city.name}
                            className='city-changer__option'
                            key={city.id}
                        >
                            {city.name}
                        </option>
                    ))}
                </select>
                {isLoading && <div className="city-changer__loading">Загрузка...</div>}
            </div>
        );
    };

    // Эффект для сохранения выбранного города в контекст и localStorage
    useEffect(() => {
        if (selectedCity && selectedCity.length !== 0) {
            // Обновляем глобальное состояние
            updateContextState('city', selectedCity);
            // Сохраняем в localStorage для persistence
            localStorage.setItem('city', selectedCity);
        } else {
            // Если город очищен, удаляем из localStorage
            localStorage.removeItem('city');
            updateContextState('city', '');
        }
    }, [selectedCity, updateContextState]);

    return (
        <div className="city-changer">
            <div className="city-changer__container">
                {!isOpen ? (
                    <button
                        className='city-changer__button'
                        onClick={toggleMenu}
                        type="button"
                    >
                        {selectedCity ? `Город: ${selectedCity}` : 'Выбрать город'}
                    </button>
                ) : (
                    renderCitySelect()
                )}

                {/* Кнопка для закрытия меню, если оно открыто */}
                {isOpen && (
                    <button
                        className='city-changer__close-button'
                        onClick={toggleMenu}
                        type="button"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default CityChanger;