import './style.css'

import MediumTitle from '../CustomTitles/MediumTitle/MediumTitle'
import PostList from '../List/List';


const TeacherBranch= () => {
    return (
        <div className="teacher-branch">
            <MediumTitle>
                Отдел для преподавателей
            </MediumTitle>
            <PostList ready={true}/>
        </div>
    );
};
export default TeacherBranch;