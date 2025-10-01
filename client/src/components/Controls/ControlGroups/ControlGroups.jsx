import './ControlGroups.css'
import trash from './red_trash.svg'

import { useEffect, useState } from 'react'

import { addCollegeGroup, deleteCollegeGroup, getCollegeGroups } from '../../../services/ApiToServer/groups'

const ControlGroups = () => {
    const [groups, setGroups] = useState([])
    const [newGroupName, setNewGroupName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Загрузка списка групп при монтировании компонента
    const loadGroups = async () => {
        try {
            setIsLoading(true)
            const groupsData = await getCollegeGroups();
            setGroups(groupsData || []) // Защита от undefined
        } catch (error) {
            console.error('Ошибка при загрузке групп:', error)
            setGroups([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadGroups()
    }, [])

    const handleSaveGroup = async () => {
        try {
            const data = await addCollegeGroup(newGroupName)

            // Добавляем новую группу в список
            setGroups(prevGroups => [...prevGroups, {
                name: newGroupName,
            }])
            // Сброс формы
            setNewGroupName('')

        } catch (error) {
            console.error('Ошибка при добавлении группы:', error)
        }
    }

    const handleDeleteGroup = async (id) => {
        try {
            // Оптимистичное обновление UI
            setGroups(prevGroups => prevGroups.filter(group => group.id !== id))
            await deleteCollegeGroup(id)
        } catch (error) {
            console.error('Ошибка при удалении группы:', error)
            loadGroups()
        }
    }

    // Обработка нажатия Enter в поле ввода
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveGroup()
        }
    }

    return (
        <div className='group-component'>
            <div className="group-list">
                {isLoading ? (
                    <p className="group-list__loading">Загрузка групп...</p>
                ) : groups.length > 0 ? (
                    groups.map((group) => (
                        <div className="group-list__item" key={group.id}>
                            <h3 className="group-list__name">{group.name}</h3>
                            <button
                                className='group-list__delete'
                                onClick={() => handleDeleteGroup(group.id)}
                                aria-label={`Удалить группу ${group.name}`}
                            >
                                <img
                                    height={24}
                                    src={trash}
                                    alt="Удалить группу"
                                    className='group-list__delete-img'
                                />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="group-list__empty">Групп пока нет</p>
                )}
            </div>
            <div className="group-create">
                <h4>Добавление новой группы </h4>
                <div className="group-create__new">
                    <input
                        type="text"
                        className="group-create__input"
                        onChange={(e) => setNewGroupName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        value={newGroupName}
                        minLength={2}
                        maxLength={50}
                        placeholder='Введите название группы...'
                    />
                    <button
                        className='group-create__button'
                        onClick={handleSaveGroup}
                        disabled={!newGroupName.trim()}
                    >
                        Сохранить
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ControlGroups;