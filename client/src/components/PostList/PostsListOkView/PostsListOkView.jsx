import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import EditPostModal from "../../EditPostModal/EditPostModel";
import { deletePost, updatePostStatus } from "../../../services/ApiToServer/posts";


/**
 * React component, whick create platform to view  posts.
 * @param {Array<Post>} filteredPostsList 
 * @returns Posts list, with base styles
 */
const PostsListOkView = ({ filteredPostsList, setFilteredPostsLists }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [editingPost, setEditingPost] = useState(null); // Добавляем состояние для редактирования

    const deletePostA = async (id) => {
        await deletePost(id)
        setFilteredPostsLists(filteredPostsList.filter(item => item.id !== id))
    };

    const changePost = (idPost) => {
        setEditingPost(idPost); 
    };

    const handleCloseModal = () => {
        setEditingPost(null); 
    };

    const handleSavePost = async (updatedPost) => {
        try {

            const updatedList = filteredPostsList.map(post =>
                post.id === updatedPost.id ? updatedPost : post
            );
            setFilteredPostsLists(updatedList);

            setEditingPost(null);
        } catch (error) {
            console.error('Ошибка при обновлении поста:', error);
        }
    };

    const publishPost = async (id) => {
        const updatedPost = await updatePostStatus(id, "1");
        if (updatedPost) {
            const updatedList = filteredPostsList.filter(post =>
                post.id !== id
            );
            setFilteredPostsLists(updatedList);
        }
    }
    const hidePost = async (id) => {
        const updatedPost = await updatePostStatus(id, "0");
        if (updatedPost) {
            const updatedList = filteredPostsList.filter(post =>
                post.id !== id
            );
            setFilteredPostsLists(updatedList);
        }
    }


    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="accordion_posts">
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
                        style={{ position: activeIndex === index ? "static" : "relative" }}
                    >
                        {post.title}
                    </button>
                    <div
                        className={`accordion_posts-content ${activeIndex === index ? 'open' : ''
                            }`}
                    >

                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        <p style={{ fontSize: '12px', marginTop: '10px' }}>{post.date_created}</p>
                        {
                            localStorage.getItem('role') === 'admin' &&
                            <div className="settings">
                                <div className="button_box">
                                    <button className="delete_post_button" onClick={() => deletePostA(post.id)}>Удалить</button>
                                    <button className="change_post_button" onClick={() => changePost(post.id)}>Реадктировать</button>
                                </div>
                                <div className="button_box">
                                    {
                                        post.status === "1" ?
                                            <button
                                                className="hide_button button_hp"
                                                onClick={() => hidePost(post.id)}
                                            >
                                                Скрыть пост
                                            </button>
                                            :
                                            <button
                                                className="publish_button button_hp"
                                                onClick={() => publishPost(post.id)}
                                            >
                                                Опубликовать пост
                                            </button>
                                    }
                                </div>

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