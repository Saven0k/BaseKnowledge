import { useEffect, useState } from 'react';
import './ChooseGroup.css'
import { getUniversityGroups } from '../../../services/ApiToServer/universityGroups';
import { getCollegeGroups } from '../../../services/ApiToServer/groups';

const ChooseGroup = ({ saveGroup, type, course, speciality, studyType }) => {
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [groups, setGroups] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // Фильтрация групп
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredGroups(groups);
        } else {
            const filtered = groups.filter(
                (spec) =>
                    spec.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredGroups(filtered);
        }
    }, [searchTerm, groups]);

    // Загрузка групп
    async function loadGroups() {
        let groups = []
        if (type === 'studentCollege') {
            groups = await getCollegeGroups();
        }
        if (type === 'studentUniversity') {
            groups = await getUniversityGroups();
        }
        setGroups(groups.map(obj => obj.name));
        setFilteredGroups(groups.map(obj => obj.name));
        return ''
    }

    useEffect(() => {
        loadGroups()
    }, [])

    return (
        <div className='choose-group'>
            <h2 className='choose-group__title'>Выберете группу</h2>
            <div className='choose-group__search'>
                <input
                    type="text"
                    placeholder="Поиск по группе..."
                    className='choose-group__input'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className='choose-group__list'>
                    {filteredGroups.map((group, index) => (
                        <li
                            key={index}
                            className='choose-group__item'
                            onClick={() => saveGroup(group)}
                        >
                            {group}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChooseGroup;