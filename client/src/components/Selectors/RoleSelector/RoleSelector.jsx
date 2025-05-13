import { addRole, getRoles } from '../../../services/ApiToServer/roles';
import './RoleSelector.css'
import React, { useState, useEffect } from 'react';


const RoleSelector = ({ saveRole }) => {
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectionMode, setSelectionMode] = useState('none');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка ролей при открытии
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
        }
    }, [isOpen]);

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

    // Обновление режима выбора при изменении selectedGroups
    useEffect(() => {
        if (selectedRole.length === 0) {
            setSelectionMode('none');
        } else {
            setSelectionMode('some');
        }
    }, [selectedRole, roles.length]);

    const handleSave = async () => {
        try {
            console.log('Роль выбрана:', selectedRole);
            addRole(selectedRole)
            setIsOpen(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    return (
        <div className="role-selector-container" style={{ position: 'relative', width: '200px' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="toggle-button"
            >
                {selectedRole.length > 0
                    ? `Выбрано: ${selectedRole}`
                    : 'Выбрать роль'}
            </button>

            {isOpen && (
                <div className="role-selector-popup">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="roles-list">
                        {isLoading ? (
                            <div className="loading">Загрузка...</div>
                        ) : filteredRoles.length === 0 ? (
                            <div className="no-results">Ничего не найдено</div>
                        ) : (
                            <ul>
                                {filteredRoles.map(role => (
                                    <li
                                        key={role.id}
                                        className={`role-item ${selectedRole.includes(role.name) ? 'selected' : ''}`}
                                        onClick={() => setSelectedRole(role.name)}
                                    >
                                        <span className="role-name">{role.name}</span>
                                        {selectedRole.includes(role.name) && (
                                            <span className="checkmark">✓</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="popup-footer">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="cancel-button"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={selectionMode === 'none'}
                            className="save-button"
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