import { useEffect, useState } from 'react';
import { getClasses } from '../../../services/ApiToServer/classes';
import './ChooseSchoolClass.css'

const ChooseSchoolClass = ({ saveSchoolClass }) => {
    const [filteredSchoolClasses, setFilteredSchoolClasses] = useState([]);
    const [schoolClasses, setSchoolClasses] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSchoolClasses(schoolClasses);
        } else {
            const filtered = schoolClasses.filter(
                (spec) =>
                    spec.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSchoolClasses(filtered);
        }
    }, [searchTerm, schoolClasses]);

    async function prepareData() {
        const schoolClasses = await getClasses()
        setSchoolClasses(schoolClasses.map(obj => obj.name));
        setFilteredSchoolClasses(schoolClasses.map(obj => obj.name));
    }

    useEffect(() => {
        prepareData()
    }, [])


    return (
        <div className='container'>
            <div className='searchContainer'>
                <input
                    type="text"
                    placeholder="Поиск по классу..."
                    className='searchInput'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className='list'>
                    {filteredSchoolClasses.map((schoolClass, index) => (
                        <li
                            key={index}
                            className='listItem'
                            onClick={() => saveSchoolClass(schoolClass)}
                        >
                            {schoolClass}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default ChooseSchoolClass;