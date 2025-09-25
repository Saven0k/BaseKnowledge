import "./style.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import EditPostModal from "../../EditPostModal/EditPostModel";
import { deletePost, updatePostStatus } from "../../../services/ApiToServer/posts";

const PostsListOkView = ({ filteredPostsList, setFilteredPostsLists }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [editingPost, setEditingPost] = useState(null);

    const userRole = localStorage.getItem('role');
    const isAdmin = userRole === 'admin';


    const handleDeletePost = async (id, title) => {
        if (!window.confirm(`Вы уверены, что хотите удалить пост "${title}"?`)) {
            return;
        }

        setProcessingPosts(prev => new Set(prev).add(id));

        try {
            await deletePost(id);
            setFilteredPostsLists(prevList => prevList.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении поста:', error);
            alert('Не удалось удалить пост');
        } finally {
            setProcessingPosts(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    }

    const handleEditPost = (postId) => {
        setEditingPost(postId);
    };

    const handleCloseModal = () => {
        setEditingPost(null);
    };

    const changePost = (idPost) => {
        setEditingPost(idPost);
    };

    const handleTogglePostStatus = async (id, currentStatus, title) => {
        const newStatus = currentStatus === "1" ? "0" : "1";
        const action = newStatus === "1" ? "опубликовать" : "скрыть";

        if (!window.confirm(`Вы уверены, что хотите ${action} пост "${title}"?`)) {
            return;
        }

        setProcessingPosts(prev => new Set(prev).add(id));

        try {
            const updatedPost = await updatePostStatus(id, newStatus);
            if (updatedPost) {
                setFilteredPostsList(prevList =>
                    prevList.map(post => post.id === id ? updatedPost : post)
                );
            }
        } catch (error) {
            console.error('Ошибка при изменении статуса поста:', error);
            alert(`Не удалось ${action} пост`);
        } finally {
            setProcessingPosts(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    const handleAccordionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!filteredPostsList || filteredPostsList.length === 0) {
        return (
            <div className="accordion-posts">
                <div className="accordion-posts__empty">
                    Посты не найдены
                </div>
            </div>
        );
    }

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
        <div className="accordion-posts">
            {editingPost && (
                <EditPostModal
                    postId={editingPost}
                    onClose={handleCloseModal}
                    onSave={handleSavePost}
                />
            )}

            {/* Список постов */}
            {filteredPostsList.map((post, index) => {
                const isActive = activeIndex === index;
                const isProcessing = processingPosts.has(post.id);

                return (
                    <div className="accordion-posts__item" key={post.id}>
                        <button
                            className={`accordion-posts__button ${isActive ? 'accordion-posts__button--active' : ''}`}
                            onClick={() => handleAccordionClick(index)}
                            disabled={isProcessing}
                            aria-expanded={isActive}
                        >
                            {post.title}
                            {isProcessing && (
                                <span className="accordion-posts__processing">...</span>
                            )}
                        </button>

                        <div
                            className={`accordion-posts__content ${isActive ? 'accordion-posts__content--open' : ''}`}
                            aria-hidden={!isActive}
                        >

                            <div
                                className="accordion-posts__post-content"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />


                            <div className="accordion-posts__meta">
                                <p className="accordion-posts__date">
                                    {formatDate(post.date_created)}
                                </p>
                                <span className={`accordion-posts__status ${post.status === "1" ? 'accordion-posts__status--published' : 'accordion-posts__status--hidden'}`}>
                                    {post.status === "1" ? 'Опубликован' : 'Скрыт'}
                                </span>
                            </div>

                            {/* Админ-панель */}
                            {isAdmin && (
                                <div className="accordion-posts__admin-panel">
                                    <div className="accordion-posts__actions">
                                        <button
                                            className="accordion-posts__action accordion-posts__action--delete"
                                            onClick={() => handleDeletePost(post.id, post.title)}
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? 'Удаление...' : 'Удалить'}
                                        </button>
                                        <button
                                            className="accordion-posts__action accordion-posts__action--edit"
                                            onClick={() => handleEditPost(post.id)}
                                            disabled={isProcessing}
                                        >
                                            Редактировать
                                        </button>
                                    </div>

                                    <div className="accordion-posts__status-actions">
                                        <button
                                            className={`accordion-posts__status-action ${post.status === "1" ? 'accordion-posts__status-action--hide' : 'accordion-posts__status-action--publish'}`}
                                            onClick={() => handleTogglePostStatus(post.id, post.status, post.title)}
                                            disabled={isProcessing}
                                        >
                                            {isProcessing
                                                ? 'Обработка...'
                                                : post.status === "1"
                                                    ? 'Скрыть пост'
                                                    : 'Опубликовать пост'
                                            }
                                        </button>
                                    </div>
                                </div>
                            )}
                            <Link
                                className="accordion-posts__link"
                                to={`/post/${post.id}`}
                            >
                                Подробнее
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default PostsListOkView;