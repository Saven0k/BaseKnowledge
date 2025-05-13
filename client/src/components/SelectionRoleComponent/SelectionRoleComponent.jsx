import './SelectionRoleComponent.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentGroups } from '../../services/ApiToServer/groups';

const SelectionRoleComponent = () => {
    const [role, setRole] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [group, setGroup] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);

    const navigate = useNavigate()

    async function prepareData() {
        const mockS = await getStudentGroups();
        setGroup(mockS.map(obj => obj.name));
        setFilteredGroups(mockS.map(obj => obj.name));
    }

    useEffect(() => {
        prepareData();
        const startRole = localStorage.getItem('role')
    }, []);
    useEffect(() => {
        localStorage.setItem('role', role)
    }, [role]);

    // Фильтрация специальностей при изменении поискового запроса
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredGroups(group);
        } else {
            const filtered = group.filter(
                (spec) =>
                    spec.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredGroups(filtered);
        }
    }, [searchTerm, group]);


    const handleSpecialtySelect = (groupName) => {
        localStorage.setItem('group', groupName);
        navigate('/student')
        // console.log(`Group ${groupName} selected, redirecting...`);
    };

    const handleTeacherClick = () => {
        if (!localStorage.getItem('role') === 'admin') {
            localStorage.setItem('role', 'teacher')
        }
        navigate('/login');
    };

    if (role === null) {
        return (
            <div className='container' >
                <h1 className='title'>Выберите свою роль</h1>
                <div className='buttonsContainer' >
                    <button
                        className='button'
                        onClick={() => setRole('student')}
                    >
                        Студент
                    </button>
                    <button
                        className='button'
                        onClick={handleTeacherClick}
                    >
                        Учитель
                    </button>
                </div>
            </div>
        );
    }

    if (role === 'student') {
        return (
            <div className='container'>
                <div className='searchContainer'>
                    <input
                        type="text"
                        placeholder="Поиск по группе..."
                        className='searchInput'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className='list'>
                        {filteredGroups.map((specialty, index) => (
                            <li
                                key={index}
                                className='listItem'
                                onClick={() => handleSpecialtySelect(specialty)}
                            >
                                {specialty}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return null;
}

export default SelectionRoleComponent;