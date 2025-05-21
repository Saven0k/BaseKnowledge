import { useEffect, useState } from 'react'
import './ControlGroups.css'
import trash from './red_trash.svg'
import { addGroup, deleteGroup, getStudentGroups } from '../../../services/ApiToServer/groups'

const ControlGroups = () => {
    const [groups, setGroups] = useState()
    const [newGroupName, setNewGroupName] = useState('')


    const prepairData = async () => {
        const groupsB = await getStudentGroups();
        setGroups(groupsB)
    }

    useEffect(() => {
        prepairData()
    }, [])

    const handleSaveGroup = () => {
        addGroup(newGroupName)
        setNewGroupName('')
        prepairData()
    }

    const handleDeleteGroup = (id) => {
        setGroups(groups.filter(group => group.id !== id))
        deleteGroup(id)
    }

    return (
        <div className='groups_component'>

            <div className="group_list">
                {groups &&
                    groups.map((group, index) => (
                        <div className="group_block" key={index}>
                            <h3>{group.name}</h3>
                            <div className="delete_group">
                                <button
                                    className='button_delete_group'
                                    onClick={() => handleDeleteGroup(group.id)}
                                >
                                    <img height={24} src={trash} alt="Delete" className='delete_group_img' />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="group_create">
                <h4>Добавление новой группы </h4>
                <div className="new_group_block">
                    <input
                        type="text"
                        className="group_name"
                        onChange={(e) => setNewGroupName(e.target.value)}
                        value={newGroupName}
                        minLength={5}
                        maxLength={15}
                        placeholder='Что-то....'
                    />
                    <button className='button_done' onClick={() => handleSaveGroup()}>
                        Сохранить
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ControlGroups;