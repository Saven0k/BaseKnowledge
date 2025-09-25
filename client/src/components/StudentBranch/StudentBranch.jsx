import './style.css'

import { useState } from 'react';

import Header from "../header/Header";
import PostList from '../List/List';
import CityChanger from '../CityChanger/CityChanger';
import { useMyContext } from '../../services/MyProvider/MyProvider';


const StudentBranch = () => {
    const { contextState } = useMyContext();
    const [page, setPage] = useState(0);

    const shouldShowCityChanger = page === 2;

    return (
        <div className='student-branch'>
            <Header />
            <nav className="navigation-menu">
                <button
                    className={`button__swipe ${page === 0 ? 'border' : ''}`}
                    onClick={() => setPage(0)}
                >
                    Общая информация
                </button>
                <button
                    className={`button__swipe ${page === 1 ? 'border' : ''}`}
                    onClick={() => setPage(1)}
                >
                    Инфо для {contextState.group || 'группы'}
                </button>
                <button
                    className={`button__swipe ${page === 2 ? 'border' : ''}`}
                    onClick={() => setPage(2)}
                >
                    Информация для {contextState.city || 'города'}
                </button>

                {shouldShowCityChanger && <CityChanger />}

                <button
                    className={`button__swipe ${page === 3 ? 'border' : ''}`}
                    onClick={() => setPage(3)}
                >
                    Информация для {contextState.form || 'формы'} обучения
                </button>
            </nav>

            <div className="pages">
                {page === 0 && <PostList ready={true} type={'all'} />}
                {page === 1 && <PostList ready={true} type={'student'} />}
                {page === 2 && <PostList ready={true} type={'city'} />}
                {page === 3 && <PostList ready={true} type={'form'} />}
            </div>
        </div>
    );
};

export default StudentBranch;