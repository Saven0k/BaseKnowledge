import './ControlSpecialities.css'

import { useEffect, useState } from 'react'
import trash from './red_trash.svg'
import { addSpeciality, deleteSpeciality, getSpecialities } from '../../../services/ApiToServer/specialities'

const ControlSpecialities = () => {
    const [specialities, setRoles] = useState([])
    const [newSpecialityName, setNewSpecialityName] = useState('')

    const prepairData = async () => {
        const specialitiesB = await getSpecialities();
        if (specialitiesB.legnth === 0) {
            setRoles([])
        } else {
            setRoles(specialitiesB)
        }
    }

    useEffect(() => {
        prepairData()
    }, [])

    const handleSaveRole = async () => {
        const data = await addSpeciality(newSpecialityName)
        setRoles([...specialities, { name: data.response.specialityName, id: data.response.specialityId }])

        setNewSpecialityName('')
    }

    const handleDeleteRole = (id) => {
        setRoles(specialities.filter(speciality => speciality.id !== id))
        deleteSpeciality(id)
    }

    return (
        <div className='specialities_component'>

            <div className="speciality_list">
                {specialities.length !== 0 ?
                    specialities.map((speciality, index) => (
                        <div className="speciality_block" key={index}>
                            <h3>{speciality.name}</h3>
                            <div className="delete_speciality">
                                <button
                                    className='button_delete_speciality'
                                    onClick={() => handleDeleteRole(speciality.id)}
                                >
                                    <img height={24} src={trash} alt="Delete" className='delete_speciality_img' />
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    <p>Специальности нет</p>
                }
            </div>
            <div className="speciality_create">
                <h4>Создание новой специальности</h4>
                <div className="new_speciality_block">
                    <input
                        type="text"
                        className="speciality_name"
                        onChange={(e) => setNewSpecialityName(e.target.value)}
                        value={newSpecialityName}
                        minLength={5}
                        maxLength={15}
                        placeholder='Что-то....'
                    />
                    <button className='button_done' onClick={() => handleSaveRole()}>
                        Сохранить
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ControlSpecialities;