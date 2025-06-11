import { useEffect, useState } from 'react';
import './ChooseGroup.css'
import { getUniversityGroups } from '../../../services/ApiToServer/universityGroups';
import { getCollegeGroups } from '../../../services/ApiToServer/collegeGroups';


const ChooseGroup = ({saveGroup, type, course, speciality, studyType}) => {
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [groups, setGroups] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

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

    async function prepareData() {

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
        prepareData()
    }, [])


    return (
        <div className='container'>
            <h2>Выберете группу</h2>
            <div className='searchContainer'>
                <input
                    type="text"
                    placeholder="Поиск по группе..."
                    className='searchInput'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className='list'>
                    {filteredGroups.map((group, index) => (
                        <li
                            key={index}
                            className='listItem'
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