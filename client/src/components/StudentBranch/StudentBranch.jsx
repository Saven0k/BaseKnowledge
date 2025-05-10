import './style.css'
import Header from "../header/Header";
import PostList from '../List/List';
import { useEffect, useState } from 'react';
import CityChanger from '../CityChanger/CityChanger';

/**
 * React component, which create platform with post list for students.
 * @returns brach with students post
 */
const StudentBranch = () => {

    // useEffect(() => {
    //     setReady(true)
    // }, [])
    return (
        <div className='student_branch'>
            <Header />
            <div className="general_inforamtion">
                <h2 className='general_information__h2'>Общая информация</h2>
                <PostList ready={true}/>
            </div>
            <div className="city_information">
                <CityChanger />
                {/* <h2 className="city_information__h2">Информация для вашего города: </h2> */}
            </div>
            <div className="group_information">
                {/* <h2>Информация для группы </h2> */}
            </div>
        </div>
    );
};
export default StudentBranch;