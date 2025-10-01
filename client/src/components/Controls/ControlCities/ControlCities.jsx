import { useEffect, useState } from 'react'
import './ControlCities.css'
import trash from './red_trash.svg'
import { addCity, deleteCity, getCities } from '../../../services/ApiToServer/cities'

const ControlCities = () => {
    const [cities, setCities] = useState([])
    const [newCityName, setNewCityName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Загрузка списка городов
    const loadCities = async () => {
        try {
            setIsLoading(true)
            const citiesData = await getCities();
            setCities(citiesData || [])
        } catch (error) {
            console.error('Ошибка при загрузке городов:', error)
            setCities([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadCities()
    }, [])

    const handleSaveCity = async () => {
        try {
            const data = await addCity(newCityName.trim())
            if (data.response) {
                setCities(prevCities => [...prevCities, {
                    name: data.response.cityName,
                    id: data.response.cityId
                }])
                setNewCityName('')
            }
        } catch (error) {
            console.error('Ошибка при добавлении города:', error)
        }
    }

    const handleDeleteCity = async (id) => {
        try {
            await deleteCity(id)
            setCities(prevCities => prevCities.filter(city => city.id !== id))
        } catch (error) {
            console.error('Ошибка при удалении города:', error)
        }
    }
    
    // Обработка нажатия Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveCity()
        }
    }

    return (
        <div className='cities-component'>
            <div className="cities-list">
                {isLoading ? (
                    <p>Загрузка городов...</p>
                ) : cities.length > 0 ? (
                    cities.map((city) => (
                        <div className="cities-list__item" key={city.id}>
                            <h3>{city.name}</h3>
                            <div className="cities-list__delete">
                                <button
                                    className='cities-list__button'
                                    onClick={() => handleDeleteCity(city.id)}
                                >
                                    <img height={24} src={trash} alt="delete city" aria-label={`Удалить город ${city.name}`} className='cities-list__img' />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Городов пока нет</p>
                )}
            </div>
            <div className="cities-create">
                <h4>Добавление нового города </h4>
                <div className="cities-add">
                    <input
                        type="text"
                        className="cities-add__input"
                        onChange={(e) => setNewCityName(e.target.value)}
                        value={newCityName}
                        onKeyPress={handleKeyPress}
                        minLength={5}
                        maxLength={15}
                        placeholder='Что-то....'
                    />
                    <button className='cities-add__button' onClick={() => handleSaveCity()}>
                        Сохранить
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ControlCities;