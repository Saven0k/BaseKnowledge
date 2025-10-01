import './style.css'

import { useState } from 'react';

import Header from "../header/Header";
import List from '../List/List';
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
                    className={`button__swipe ${page === 0 ? 'active' : ''}`}
                    onClick={() => setPage(0)}
                >
                    Общая информация
                </button>
                <button
                    className={`button__swipe ${page === 1 ? 'active' : ''}`}
                    onClick={() => setPage(1)}
                >
                    Инфо для {contextState.group || 'группы'}
                </button>
                <div className='navigation-menu__block'>
                    <button
                        className={`button__swipe ${page === 2 ? 'active' : ''}`}
                        onClick={() => setPage(2)}
                    >
                        Информация для города
                    </button>

                    {shouldShowCityChanger && <CityChanger />}
                </div>

                <button
                    className={`button__swipe ${page === 3 ? 'active' : ''}`}
                    onClick={() => setPage(3)}
                >
                    Информация для {contextState.form || 'формы'} обучения
                </button>
            </nav>

            <div className="pages">
                {page === 0 && <List ready={true} type={'all'} data={{role: "student", }} />}
                {page === 1 && <List ready={true} type={'student'} data={{role: "student"}} />}
                {page === 2 && <List ready={true} type={'city'} data={{role: "student"}} />}
                {page === 3 && <List ready={true} type={'form'} data={{role: "student"}} />}
            </div>
        </div>
    );
};

export default StudentBranch;