import './ControlSpecialities.css'
import trash from './red_trash.svg'

import { useEffect, useState } from 'react'

import { addSpeciality, deleteSpeciality, getSpecialities } from '../../../services/ApiToServer/specialities'

const ControlSpecialities = () => {
    const [specialities, setSpecialities] = useState([])
    const [newSpecialityName, setNewSpecialityName] = useState('')

    // Загрузка списка специальностей
    const loadSpecialities = async () => {
        try {
            const specialitiesData = await getSpecialities();
            if (specialitiesData.length === 0) {
                setSpecialities([])
            } else {
                setSpecialities(specialitiesData)
            }
        } catch (error) {
            console.error('Ошибка при загрузке специальностей:', error)
            setSpecialities([])
        }
    }

    useEffect(() => {
        loadSpecialities()
    }, [])

    const handleSaveSpeciality = async () => {
        try {
            const data = await addSpeciality(newSpecialityName.trim())
            if (data.response) {
                setSpecialities(prevSpecialities => [...prevSpecialities, {
                    name: data.response.specialityName,
                    id: data.response.specialityId
                }])
                setNewSpecialityName('')
            }
        } catch (error) {
            console.error('Ошибка при добавлении специальности:', error)
        }
    }

    const handleDeleteSpeciality = async (id) => {
        try {
            setSpecialities(prevSpecialities => prevSpecialities.filter(speciality => speciality.id !== id))
            await deleteSpeciality(id)
        } catch (error) {
            console.error('Ошибка при удалении специальности:', error)
            loadSpecialities()
        }
    }

    return (
        <div className='specialities-component'>

            <div className="specialities-list">
                {specialities.length !== 0 ?
                    specialities.map((speciality, index) => (
                        <div className="specialities-list__item" key={speciality.id}>
                            <h3>{speciality.name}</h3>

                            <button
                                className='specialities-list__button'
                                onClick={() => handleDeleteSpeciality(speciality.id)}
                                aria-label={`Удалить специальность ${speciality.name}`}
                            >
                                <img
                                    height={24}
                                    src={trash}
                                    alt="Удалить специальность"
                                    className='specialities-list__delete-img'
                                />
                            </button>

                        </div>
                    ))
                    :
                    <p>Специальности нет</p>
                }
            </div>
            <div className="specialities-create">
                <h4>Создание новой специальности</h4>
                <div className="specialities-new">
                    <input
                        type="text"
                        className="specialities-create__input"
                        onChange={(e) => setNewSpecialityName(e.target.value)}
                        value={newSpecialityName}
                        minLength={2}
                        maxLength={50}
                        placeholder='Введите название специальности...'
                    />
                    <button
                        className='specialities-create__button'
                        onClick={handleSaveSpeciality}
                        disabled={!newSpecialityName.trim()}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ControlSpecialities;