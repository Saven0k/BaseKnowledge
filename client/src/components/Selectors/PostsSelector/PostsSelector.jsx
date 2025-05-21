import { useEffect, useState } from 'react';
import './PostsSelector.css';
import GroupSelector from '../GroupSelector/GroupSelector';
import CitySelector from '../CitySelector/CitySelector';



const PostsSelector = () => {

    const [posts, setPosts] = useState();
    const [role, setRole] = useState('');

    const [groupList, setGroupList] = useState([])
    const [city, setCity] = useState()

    return (
        <div className="post_selector">
            <div className="select_buttons">
                <button
                    className="select_button"
                    onClick={() => setRole('teacher')}
                >
                    Посты Учителей
                </button>
                <div className="posts_by_students">
                    {
                        groupList.length === 0 &&
                        <button
                            className="select_button"
                            onClick={() => setRole('student')}
                        >
                            Посты
                        </button>
                    }
                    {
                        role === 'student' &&
                        <GroupSelector saveGroupList={setGroupList} />
                    }
                </div>
                <div className="posts_by_cities">
                    {
                        city &&
                        <button
                            className="select_button"
                            onClick={() => setRole('city')}
                        >
                            Посты по городам
                        </button>
                    }
                    {
                        role === 'city' && 
                        <CitySelector saveCity={setCity} />
                    }
                </div>
            </div>

        </div>
    )
};

export default PostsSelector;