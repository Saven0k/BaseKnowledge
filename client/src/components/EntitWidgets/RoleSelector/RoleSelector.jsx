import { getRoles } from '../../../services/ApiToServer/roles';
import './RoleSelector.css'
import React, { useState, useEffect } from 'react';

const RoleSelector = ({ role, saveRole }) => {
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectionMode, setSelectionMode] = useState('none');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка ролей
    useEffect(() => {
        if (isOpen && roles.length === 0) {
            const fetchRoles = async () => {
                try {
                    setIsLoading(true);
                    const roles = await getRoles()
                    setRoles(roles);
                    setFilteredRoles(roles);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Ошибка при загрузке ролей:', error);
                    setIsLoading(false);
                }
            };
            fetchRoles();
        };
    }, [isOpen]);
    
    // Сброс выбора
    useEffect(() => {
        if( role === '') {
            setSelectedRole('')
        }
    }, [role])

    // Фильтрация ролей
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredRoles(roles);
        } else {
            const filtered = roles.filter(role =>
                role.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRoles(filtered);
        }
    }, [searchTerm, roles]);

    // Обновление режима выбора
    useEffect(() => {
        if (selectedRole.length === 0) {
            setSelectionMode('none');
        } else {
            setSelectionMode('some');
        }
    }, [selectedRole, roles.length]);

    // Сохранение выбора
    const handleSave = async () => {
        try {
            saveRole(selectedRole)
            setIsOpen(false);
            console.log('Роль выбрана:', selectedRole);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    return (
        <div className="role-selector">
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className="role-selector__toggle"
            >
                {selectedRole
                    ? `Выбрано: ${selectedRole}`
                    : 'Выбрать роль'}
            </button>

            {isOpen && (
                <div className="role-selector__popup">
                    <div className="role-selector__search">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            className="role-selector__search-input"
                        />
                    </div>
                    <div className="role-selector__list">
                        {isLoading ? (
                            <div className="role-selector__loading">Загрузка...</div>
                        ) : filteredRoles.length === 0 ? (
                            <div className="role-selector__empty">Ничего не найдено</div>
                        ) : (
                            <ul className="role-selector__items">
                                {filteredRoles.map(role => (
                                    <li
                                        key={role.id}
                                        className={`role-selector__item ${selectedRole === role.name ? 'role-selector__item--selected' : ''}`}
                                        onClick={() => setSelectedRole(role.name)}
                                    >
                                        <span className="role-selector__name">{role.name}</span>
                                        {selectedRole === role.name && (
                                            <span className="role-selector__checkmark">✓</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="role-selector__footer">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="role-selector__cancel"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={selectionMode === 'none'}
                            className="role-selector__save"
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleSelector;