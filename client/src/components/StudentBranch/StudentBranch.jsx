import './style.css'
import Header from "../header/Header";
import PostList from '../List/List';
import { useEffect, useState } from 'react';

/**
 * React component, which create platform with post list for students.
 * @returns brach with students post
 */
const StudentBranch = () => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
    }, [])
    return (
        <div className='student_branch'>
            <Header />
            <div className="title-hello">
                <h1 className='h1-hello'>Добро пожаловать в базу знаний!</h1>
            </div>
            <PostList ready={ready}/>
        </div>
    );
};
export default StudentBranch;