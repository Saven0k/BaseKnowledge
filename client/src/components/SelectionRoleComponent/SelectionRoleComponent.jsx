import './SelectionRoleComponent.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentGroups } from '../../services/ApiToServer/groups';
import { useMyContext } from '../../services/MyProvider/MyProvider';

const SelectionRoleComponent = () => {
    const [role, setRole] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [group, setGroup] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [studyType, setStudyType] = useState('');
    const { contextState, updateContextState } = useMyContext();


    const navigate = useNavigate()

    async function prepareData() {
        const mockS = await getStudentGroups();
        setGroup(mockS.map(obj => obj.name));
        setFilteredGroups(mockS.map(obj => obj.name));
    }

    useEffect(() => {
        if (role === 'student') {
            prepareData();
        }
    }, [role]);

    useEffect(() => {
        updateContextState('role', role)
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

    const handleStudyTypeClick = (type) => {
        console.log(studyType.length)
        setStudyType(type);
        updateContextState('form', type)
        console.log(studyType.length)
    };


    const handleSpecialtySelect = (groupName) => {
        updateContextState('group', groupName)
        navigate('/student')
    };

    const handleTeacherClick = () => {
        updateContextState('role', 'teacher')
        navigate('/login');
    };


    const resetSelection = () => {
        setRole(null);
        setStudyType(null);
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

    if (role === 'student' && studyType.length === 0) {
        return (

            <div className='form_study'>
                <h2>Выберите форму обучения</h2>
                <div className="form_study_buttons">
                    <button className='button_study' onClick={() => handleStudyTypeClick('Очное')}>Очное</button>
                    <button className='button_study' onClick={() => handleStudyTypeClick('Заочное')}>Заочное</button>
                    <button className='button_study' onClick={() => handleStudyTypeClick('Дистанционное')}>Дистанционное</button>
                    <button className='button_study' onClick={resetSelection} style={{ marginTop: '10px' }}>Назад</button>
                </div>
            </div>)
    }

    if (studyType.length > 0) {
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
