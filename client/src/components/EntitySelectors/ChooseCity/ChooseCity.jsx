import { useEffect, useState } from "react"
import { getCities } from "../../../services/ApiToServer/cities"
import './style.css'

const ChooseCity = ({saveCity}) => {
    const [cities, setCities] = useState([])

    const prepareCities = async () => {
        const newCities = await getCities()
        setCities(newCities)
    }

    useEffect(() => {
        prepareCities()
    },[])

    return (
        <div className="chooseCity_box">
            <p className="info_title">
                Выберете город
            </p>
            <div className="cities_box">
                {
                    cities.map((city,index) => (
                        <button key={index} className="city_box" onClick={() => saveCity(city.name)}>
                            {city.name}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default ChooseCity