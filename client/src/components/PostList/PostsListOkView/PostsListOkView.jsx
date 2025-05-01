import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import EditPostModal from "../../EditPostModal/EditPostModel";
import { deletePost } from "../../../services/workWithBd";
import TimerNotification from '../../TimerNotification/TimerNotification';


/**
 * React component, whick create platform to view  posts.
 * @param {Array<Post>} filteredPostsList 
 * @returns Posts list, with base styles
 */
const PostsListOkView = ({ filteredPostsList, setFilteredPostsLists }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [postId, setPostId] = useState();
    const [editingPost, setEditingPost] = useState(null); // Добавляем состояние для редактирования

    const deletePostA = (id) => {
        setIsDelete(true);
        setPostId(id);
    };

    const changePost = (idPost) => {
        setEditingPost(idPost); // Устанавливаем пост для редактирования
    };

    const handleCloseModal = () => {
        setEditingPost(null); // Закрываем модальное окно
    };

    const handleSavePost = async (updatedPost) => {
        try {
            // Здесь ваш запрос на обновление поста
            // await updatePost(updatedPost);

            // Обновляем список постов
            const updatedList = filteredPostsList.map(post =>
                post.id === updatedPost.id ? updatedPost : post
            );
            setFilteredPostsLists(updatedList);

            setEditingPost(null);
        } catch (error) {
            console.error('Ошибка при обновлении поста:', error);
        }
    };


    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="accordion_posts">
            {isDelete && (
                <TimerNotification
                    text="Запись удалиьтся через"
                    func={deletePost}
                    id={postId}
                    setState={setIsDelete}
                    filteredPostsList={filteredPostsList}
                    setFilteredPostsLists={setFilteredPostsLists}
                />
            )}
            {/* Модальное окно редактирования */}
            {editingPost && (
                <EditPostModal
                    postId={editingPost}
                    onClose={handleCloseModal}
                    onSave={handleSavePost}
                />
            )}

            {filteredPostsList.map((post, index) => (

                <div className="accordion_posts-item" key={index}>
                    <button
                        className="accordion_posts-button"
                        onClick={() => handleClick(index)}
                        style={{ backgroundColor: activeIndex === index ? "#3739dd" : "red", position: activeIndex === index ? "static" : "relative" }}
                    >
                        {post.name}
                    </button>
                    <div
                        className={`accordion_posts-content ${activeIndex === index ? 'open' : ''
                            }`}
                    >

                        <div dangerouslySetInnerHTML={{ __html: post.text }} />
                        <p style={{ fontSize: '12px' }}>{post.date_created}</p>
                        {
                            localStorage.getItem('role') === 'admin' &&
                            <div className="button_box">
                                <button className="delete_post_button" onClick={() => deletePostA(post.id)}>Удалить</button>
                                <button className="change_post_button" onClick={() => changePost(post.id)}>Реадктировать</button>
                            </div>
                        }
                        <Link className="Link_more" to={`/post/${post.id}`}>Подробнее</Link>
                    </div>


                </div>
            ))}
        </div>
    )
};
export default PostsListOkView;