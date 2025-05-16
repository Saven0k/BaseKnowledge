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
                <button
                    className={`button__swipe ${page === 0 ? 'border': ''}`}
                    onClick={() => setPage(0)}
                >
                    Общая информация
                </button>
                <button
                    className={`button__swipe ${page === 1 ? 'border': ''}`}
                    onClick={() => setPage(1)}
                >
                    Инфо для {contextState.group}
                </button>
                <button
                    className={`button__swipe ${page === 2 ? 'border': ''}`}
                    onClick={() => setPage(2)}
                >
                    {contextState.city}
                </button>
                {page === 2 && <CityChanger />}
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
            </div>
            
        </div>
    );
};
export default StudentBranch;

{/* <div className="general_inforamtion bloack">
                <h2 className='general_information__h2'>Общая информация</h2>
                <PostList ready={true} type={'student'} />
            </div>
            <div className="city_information bloack">
                <CityChanger />
                <PostList ready={true} type={'city'} />
            </div>
            <div className="group_information bloack">

            </div> */}