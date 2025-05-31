import { useEffect, useState } from 'react'
import './ControlRoles.css'
import trash from './red_trash.svg'
import { addRole, deleteRole, getRoles } from '../../../services/ApiToServer/roles'

const ControlRoles = () => {
    const [roles, setRoles] = useState([])
    const [newRoleName, setNewRoleName] = useState('')

    const prepairData = async () => {
        const rolesB = await getRoles();
        if (rolesB.legnth === 0) {
            setRoles([])
        } else {
            setRoles(rolesB)
        }
    }

    useEffect(() => {
        prepairData()
    }, [])

    const handleSaveRole = async () => {
        const data = await addRole(newRoleName)
        setRoles([...roles, { name: data.response.roleName, id: data.response.roleId }])

        setNewRoleName('')
    }

    const handleDeleteRole = (id) => {
        setRoles(roles.filter(role => role.id !== id))
        deleteRole(id)
    }

    return (
        <div className='roles_component'>

            <div className="role_list">
                {roles.length !== 0 ?
                    roles.map((role, index) => (
                        <div className="role_block" key={index}>
                            <h3>{role.name}</h3>
                            <div className="delete_role">
                                <button
                                    className='button_delete_role'
                                    onClick={() => handleDeleteRole(role.id)}
                                >
                                    <img height={24} src={trash} alt="Delete" className='delete_role_img' />
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    <p>Ролей нет</p>
                }
            </div>
            <div className="role_create">
                <h4>Создание новой роли</h4>
                <div className="new_role_block">
                    <input
                        type="text"
                        className="role_name"
                        onChange={(e) => setNewRoleName(e.target.value)}
                        value={newRoleName}
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
export default ControlRoles;