import { getStudentGroups } from '../../../services/ApiToServer/groups';
import './groupSelector.css'
import React, { useState, useEffect } from 'react';


const GroupSelector = ({ saveGroupList }) => {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectionMode, setSelectionMode] = useState('none'); // 'none', 'some', 'all'
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка групп при открытии
    useEffect(() => {
        if (isOpen && groups.length === 0) {
            const fetchGroups = async () => {
                try {
                    setIsLoading(true);
                    const groups = await getStudentGroups()
                    setGroups(groups);
                    setFilteredGroups(groups);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Ошибка при загрузке групп:', error);
                    setIsLoading(false);
                }
            };
            fetchGroups();
        }
    }, [isOpen]);

    // Фильтрация групп
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredGroups(groups);
        } else {
            const filtered = groups.filter(group =>
                group.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredGroups(filtered);
        }
    }, [searchTerm, groups]);

    // Обновление режима выбора при изменении selectedGroups
    useEffect(() => {
        if (selectedGroups.length === 0) {
            setSelectionMode('none');
        } else if (selectedGroups.length === groups.length && groups.length > 0) {
            setSelectionMode('all');
        } else {
            setSelectionMode('some');
        }
    }, [selectedGroups, groups.length]);

    const toggleGroupSelection = (groupName) => {
        setSelectedGroups(prev =>
            prev.includes(groupName)
                ? prev.filter(name => name !== groupName)
                : [...prev, groupName]
        );
    };

    const selectAllGroups = () => {
        if (selectionMode === 'all') {
            setSelectedGroups([]);
            setSelectionMode('none');
        } else {
            setSelectedGroups(groups.map(group => group.name));
            setSelectionMode('all');
        }
    };

    const handleSave = async () => {
        try {
            let groupsToSave = selectedGroups;
            if (selectionMode === 'all') {
                groupsToSave = 'all';
            }
            console.log('Сохраненные группы:', groupsToSave);
            saveGroupList(groupsToSave)
            setIsOpen(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    return (
        <div className="group-selector-container" style={{ position: 'relative', width: '200px' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group_toggle-button"
            >
                {selectionMode === 'all'
                    ? 'Все группы'
                    : selectedGroups.length > 0
                        ? `Выбрано: ${selectedGroups.length}`
                        : 'Выбрать группы'}
            </button>

            {isOpen && (
                <div className="group-selector-popup">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="all-groups-button">
                        <button
                            onClick={selectAllGroups}
                            className={selectionMode === 'all' ? 'selected' : ''}
                        >
                            {selectionMode === 'all' ? '✓ Все группы' : 'Все группы'}
                        </button>
                    </div>

                    <div className="groups-list">
                        {isLoading ? (
                            <div className="loading">Загрузка...</div>
                        ) : filteredGroups.length === 0 ? (
                            <div className="no-results">Ничего не найдено</div>
                        ) : (
                            <ul>
                                {filteredGroups.map(group => (
                                    <li
                                        key={group.id}
                                        className={`group-item ${selectedGroups.includes(group.name) ? 'selected' : ''}`}
                                        onClick={() => toggleGroupSelection(group.name)}
                                    >
                                        <span className="group-name">{group.name}</span>
                                        {selectedGroups.includes(group.name) && (
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

export default GroupSelector;