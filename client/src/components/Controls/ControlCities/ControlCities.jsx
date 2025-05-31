import { useEffect, useState } from 'react'
import './ControlCities.css'
import trash from './red_trash.svg'
import { addCity, deleteCity, getCities } from '../../../services/ApiToServer/cities'

const ControlCitites = () => {
    const [cities, setCities] = useState([])
    const [newCityName, setNewCityName] = useState('')

    const prepairData = async () => {
        const citiesB = await getCities();
        if (citiesB.length === 0) {
            setCities([])
        } else {
            setCities(citiesB)
        }
    }

    useEffect(() => {
        prepairData()
    }, [])

    const handleSaveCity = async () => {
        const data = await addCity(newCityName)
        setCities([...cities, { name: data.response.cityName, id: data.response.cityId }])
        setNewCityName('')
    }

    const handleDeleteCity = (id) => {
        setCities(cities.filter(city => city.id !== id))
        deleteCity(id)
    }

    return (
        <div className='cities_component'>

            <div className="city_list">
                {cities.length !== 0 ?
                    cities.map((city, index) => (
                        <div className="city_block" key={index}>
                            <h3>{city.name}</h3>
                            <div className="delete_city">
                                <button
                                    className='button_delete_city'
                                    onClick={() => handleDeleteCity(city.id)}
                                >
                                    <img height={24} src={trash} alt="Delete" className='delete_city_img' />
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    <p>Городов пока нет</p>
                }
            </div>
            <div className="city_create">
                <h4>Добавление нового города </h4>
                <div className="new_city_block">
                    <input
                        type="text"
                        className="city_name"
                        onChange={(e) => setNewCityName(e.target.value)}
                        value={newCityName}
                        minLength={5}
                        maxLength={15}
                        placeholder='Что-то....'
                    />
                    <button className='button_done' onClick={() => handleSaveCity()}>
                        Сохранить
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ControlCitites;