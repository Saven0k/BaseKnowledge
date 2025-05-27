import { useEffect, useState } from 'react';
import './CityChanger.css';
import { getCities } from '../../services/ApiToServer/cities';
import { useMyContext } from '../../services/MyProvider/MyProvider';


const CityChanger = () => {
    const { contextState, updateContextState } = useMyContext();

    const [selectedCity, setSelectedCity] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [cities, setCities] = useState([])

    const loadCities = async () => {
        const downloadCities = await getCities()
        setCities(downloadCities)
    }
    const selectCity = (city) => {
        setIsOpen(false)
        setSelectedCity(city)
    }

    useEffect(() => {
        setSelectedCity(localStorage.getItem('city') === null ? '': localStorage.getItem('city'))
    }, [])

    useEffect(() => {
        if (isOpen) {
            loadCities()
        }
    }, [isOpen])

    const menuSelect = () => {
        return (
            <div className="menu_select">
                <select className='select_city' onChange={(e) => selectCity(e.target.value)}>
                    <option value="none">Не выбрано</option>
                    {
                        cities.map(city => (
                            <option
                                value={city.name}
                                className='city_name'
                                key={city.id}
                            >{city.name}</option>
                        ))
                    }
                </select>
            </div>
        )
    }
    useEffect(() => {
        if (selectedCity.length !== 0) {
            updateContextState('city', selectedCity)
        }
    }, [selectedCity])


    return (
        <div className="info_block">
            <div className="city_block">
                {
                    isOpen === false ?
                        <button
                            className='change_city_button button_city'
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Изменить город
                        </button>
                        :
                        menuSelect()
                }
            </div>
        </div>
    )
}

export default CityChanger;