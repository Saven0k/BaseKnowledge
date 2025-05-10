import { useEffect, useState } from 'react';
import './CityChanger.css'


const CityChanger = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [cities, setCities] = useState([])
    // const [filteredCities, setFilteredCities] = useState([])
    // const [searchTerm, setSearchTerm] = useState('')

    const loadCities = async () => {
        // const downloadCities = await getCitie
        // setCities(downloadCities)
    }
    const selectCity = (city) => {
        setIsOpen(false)
        setSelectedCity(city)
        localStorage.setItem('city', city)
    }
    // useEffect(() => {
    //     if (searchTerm === '') {
    //         setFilteredCities(cities);
    //     } else {
    //         const filtered = cities.filter(city =>
    //             city.name.toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //         setFilteredCities(filtered);
    //     }
    // }, [searchTerm, cities]);

    useEffect(() => {
        if (isOpen) {
            loadCities()
        }
    }, [isOpen])

    const menuSelect = () => {
        return (
            <div className="menu_select">
                <select className='select_city'>
                    <option value="Не выбрано">Не выбрано</option>
                    {
                        cities.map(city => (
                            <option
                                value={city.name}
                                className='city_name'
                                key={city.id}
                                onClick={selectCity(city.name)}
                            >{city.name}</option>
                        ))
                    }
                </select>
            </div>
        )
    }


    return (
        <div className="info_block">
            <h2>Информация для города: </h2>
            {
                selectedCity.length !== 0 ?
                    <div className="city_block">
                        <h3>{selectedCity}</h3>
                        <button
                            className='change_city_button'
                            onClick={() => setIsOpen(true)}
                        >
                            Изменить город
                        </button>
                        {
                            isOpen && menuSelect()
                        }
                    </div>
                    :
                    <div className="city_block">
                        <h3>Город не выбран</h3>
                        <button
                            className="select_city_button"
                            onClick={() => setIsOpen(true)}
                        >
                            Выбрать город
                        </button>
                        {
                            isOpen && menuSelect()
                        }
                    </div>
            }
        </div>
    )
}

export default CityChanger;