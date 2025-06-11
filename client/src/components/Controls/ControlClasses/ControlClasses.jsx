import './ControlClasses.css'

import { useEffect, useState } from 'react'
import trash from './red_trash.svg'
import { addClass, deleteClass, getClasses } from '../../../services/ApiToServer/classes'

const ControlClasses = () => {
    const [classes, setClasses] = useState([])
    const [newClassName, setNewClassName] = useState('')

    const prepairData = async () => {
        const classesB = await getClasses();
        if (classesB.length === 0) {
            setClasses([])
        }
        else {
            setClasses(classesB)
        }
    }

    useEffect(() => {
        prepairData()
    }, [])

    const handleSaveClass = async () => {
        const data = await addClass(newClassName)
        setClasses([...classes, { name: data.response.newClassName, id: data.response.classId }])
        setNewClassName('')
    }

    const handleDeleteClass = (id) => {
        setClasses(classes.filter(schoolClass => schoolClass.id !== id))
        deleteClass(id)
    }

    return (
        <div className='classes_component'>

            <div className="class_list">
                {classes.length !== 0 ?
                    classes.map((schoolClass, index) => (
                        <div className="class_block" key={index}>
                            <h3>{schoolClass.name}</h3>
                            <div className="delete_class">
                                <button
                                    className='button_delete_class'
                                    onClick={() => handleDeleteClass(schoolClass.id)}
                                >
                                    <img height={24} src={trash} alt="Delete" className='delete_class_img' />
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    <p>Ничего нет</p>
                }
            </div>
            <div className="class_create">
                <h4>Добавление новой группы </h4>
                <div className="new_class_block">
                    <input
                        type="text"
                        className="class_name"
                        onChange={(e) => setNewClassName(e.target.value)}
                        value={newClassName}
                        minLength={5}
                        maxLength={15}
                        placeholder='Что-то....'
                    />
                    <button className='button_done' onClick={() => handleSaveClass()}>
                        Сохранить
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ControlClasses;