import './ControlRoles.css'
import trash from './red_trash.svg'

import { useEffect, useState } from 'react'

import { addRole, deleteRole, getRoles } from '../../../services/ApiToServer/roles'

const ControlRoles = () => {
    const [roles, setRoles] = useState([])
    const [newRoleName, setNewRoleName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Загрузка списка ролей
    const loadRoles = async () => {
        try {
            setIsLoading(true)
            const rolesData = await getRoles();
            setRoles(rolesData || []) // Защита от undefined
        } catch (error) {
            console.error('Ошибка при загрузке ролей:', error)
            setRoles([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadRoles()
    }, [])

    const handleSaveRole = async () => {
        try {
            const data = await addRole(newRoleName.trim())
            if (data.response) {
                setRoles(prevRoles => [...prevRoles, {
                    name: data.response.roleName,
                    id: data.response.roleId
                }])
                setNewRoleName('')
            }
        } catch (error) {
            console.error('Ошибка при добавлении роли:', error)
        }
    }

    const handleDeleteRole = async (id) => {
        try {
            // Оптимистичное обновление UI
            setRoles(prevRoles => prevRoles.filter(role => role.id !== id))
            await deleteRole(id)
        } catch (error) {
            console.error('Ошибка при удалении роли:', error)
            loadRoles()
        }
    }

    // Обработка нажатия Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveRole()
        }
    }

    return (
        <div className='roles-component'>

            <div className="roles-list">
                {isLoading ? (
                    <p className="roles-list__loading">Загрузка ролей...</p>
                ) : roles.length > 0 ? (
                    roles.map((role) => (
                        <div className="roles-list__item" key={role.id}>
                            <h3 className="roles-list__name">{role.name}</h3>
                            <button
                                className='roles-list__delete'
                                onClick={() => handleDeleteRole(role.id)}
                                aria-label={`Удалить роль ${role.name}`}
                            >
                                <img
                                    height={24}
                                    src={trash}
                                    alt="Удалить роль"
                                    className='roles-list__delete-img'
                                />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="roles-list__empty">Ролей пока нет</p>
                )}
            </div>
            <div className="roles-create">
                <h4>Создание новой роли</h4>
                <div className="roles-create__new">
                    <input
                        type="text"
                        className="roles-create__input"
                        onChange={(e) => setNewRoleName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        value={newRoleName}
                        minLength={2}
                        maxLength={50}
                        placeholder='Введите название роли...'
                    />
                    <button
                        className='roles-create__button'
                        onClick={handleSaveRole}
                        disabled={!newRoleName.trim()}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ControlRoles;