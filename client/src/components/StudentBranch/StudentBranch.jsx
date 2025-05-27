import './style.css'
import Header from "../header/Header";
import PostList from '../List/List';
import { useEffect, useState } from 'react';
import CityChanger from '../CityChanger/CityChanger';
import { useMyContext } from '../../services/MyProvider/MyProvider';


/**
 * React component, which create platform with post list for students.
 * @returns brach with students post
 */
const StudentBranch = () => {
    const { contextState, updateContextState } = useMyContext();

    const [page, setPage] = useState(0)
    return (
        <div className='student_branch'>
            <Header />
            <div className="menu_navigatio">
                <div className="button_box">
                    <button
                        className={`button__swipe ${page === 0 ? 'border': ''}`}
                        onClick={() => setPage(0)}
                    >
                        Общая информация
                    </button>
                </div>
                <div className="button_box">
                    <button
                        className={`button__swipe ${page === 1 ? 'border': ''}`}
                        onClick={() => setPage(1)}
                    >
                        Инфо для {contextState.group}
                    </button>
                </div>
                <div className="button_box">
                    <button
                        className={`button__swipe ${page === 2 ? 'border': ''}`}
                        onClick={() => setPage(2)}
                    >
                        Информация для {contextState.city}
                    </button>
                    {page === 2 && <CityChanger />}
                </div>
                <div className="button_box">
                    <button
                        className={`button__swipe ${page === 3 ? 'border': ''}`}
                        onClick={() => setPage(3)}
                    >
                        Информация для {contextState.form} формы обучения
                    </button>
                </div>
            </div>
            <div className="pages">
                {
                    page === 0 &&  <PostList ready={true} type={'all'} />
                }
                {
                    page === 1 && <PostList ready={true} type={'student'} />
                }
                {
                    page === 2 && <PostList ready={true} type={'city'} />
                }
                {
                    page === 3 && <PostList ready={true} type={'form'} />
                }
            </div>
            
        </div>
    );
};
export default StudentBranch;