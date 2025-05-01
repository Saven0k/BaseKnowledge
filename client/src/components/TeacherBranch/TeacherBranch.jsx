import './style.css'
import MediumTitle from '../CustomTitles/MediumTitle/MediumTitle'
import PostList from '../List/List';

/**
 * React component, which create platform with post list for teachers.
 * @returns brach with teachers post
 */
const TeacherBranch= () => {
    return (
        <div className="teacherBranch">
            <MediumTitle>
                Отдел для преподавателей
            </MediumTitle>
            <PostList ready={true}/>
        </div>
    );
};
export default TeacherBranch;