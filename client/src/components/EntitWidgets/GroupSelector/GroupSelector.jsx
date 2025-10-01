import { getCollegeGroups } from '../../../services/ApiToServer/groups';
import './groupSelector.css'
import React, { useState, useEffect } from 'react';

const GroupSelector = ({ saveGroupList }) => {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectionMode, setSelectionMode] = useState('none');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Загрузка групп
    useEffect(() => {
        if (isOpen && groups.length === 0) {
            const fetchGroups = async () => {
                try {
                    setIsLoading(true);
                    const groups = await getCollegeGroups()
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

    // Обновление режима выбора
    useEffect(() => {
        if (selectedGroups.length === 0) {
            setSelectionMode('none');
        } else if (selectedGroups.length === groups.length && groups.length > 0) {
            setSelectionMode('all');
        } else {
            setSelectionMode('some');
        }
    }, [selectedGroups, groups.length]);

    // Переключение выбора группы
    const toggleGroupSelection = (groupName) => {
        setSelectedGroups(prev =>
            prev.includes(groupName)
                ? prev.filter(name => name !== groupName)
                : [...prev, groupName]
        );
    };

    // Выбор всех групп
    const selectAllGroups = () => {
        if (selectionMode === 'all') {
            setSelectedGroups([]);
            setSelectionMode('none');
        } else {
            setSelectedGroups(groups.map(group => group.name));
            setSelectionMode('all');
        }
    };

    // Сохранение выбора
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
        <div className="group-selector">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group-selector__toggle"
            >
                {selectionMode === 'all'
                    ? 'Все группы'
                    : selectedGroups.length > 0
                        ? `Выбрано: ${selectedGroups.length}`
                        : 'Выбрать группы'}
            </button>

            {isOpen && (
                <div className="group-selector__popup">
                    <div className="group-selector__search">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            className="group-selector__search-input"
                        />
                    </div>

                    <div className="group-selector__all">
                        <button
                            onClick={selectAllGroups}
                            className={`group-selector__all-button ${selectionMode === 'all' ? 'group-selector__all-button--selected' : ''}`}
                        >
                            {selectionMode === 'all' ? '✓ Все группы' : 'Все группы'}
                        </button>
                    </div>

                    <div className="group-selector__list">
                        {isLoading ? (
                            <div className="group-selector__loading">Загрузка...</div>
                        ) : filteredGroups.length === 0 ? (
                            <div className="group-selector__empty">Ничего не найдено</div>
                        ) : (
                            <ul className="group-selector__items">
                                {filteredGroups.map(group => (
                                    <li
                                        key={group.id}
                                        className={`group-selector__item ${selectedGroups.includes(group.name) ? 'group-selector__item--selected' : ''}`}
                                        onClick={() => toggleGroupSelection(group.name)}
                                    >
                                        <span className="group-selector__name">{group.name}</span>
                                        {selectedGroups.includes(group.name) && (
                                            <span className="group-selector__checkmark">✓</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="group-selector__footer">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="group-selector__cancel"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={selectionMode === 'none'}
                            className="group-selector__save"
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