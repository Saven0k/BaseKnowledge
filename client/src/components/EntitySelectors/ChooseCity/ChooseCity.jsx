import { useEffect, useState } from "react"
import { getCities } from "../../../services/ApiToServer/cities"
import './style.css'

const ChooseCity = ({ saveCity }) => {
    const [cities, setCities] = useState([])

    // Загрузка городов
    const loadCities = async () => {
        const newCities = await getCities()
        setCities(newCities)
    }

    useEffect(() => {
        loadCities()
    }, [])

    return (
        <div className="choose-city">
            <p className="choose-city__title">
                Выберете город
            </p>
            <div className="choose-city__list">
                {
                    cities.map((city, index) => (
                        <button key={index} className="choose-city__item" onClick={() => saveCity(city.name)}>
                            {city.name}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default ChooseCity