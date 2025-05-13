import { useEffect, useState } from 'react';
import './PostDetail.css'
import { Link } from 'react-router-dom';
import { getPost } from '../../services/ApiToServer/posts';
const PostDetail = ({ id }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await getPost(id);
                setPost(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadPost();
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (!post) return <div>Пост не найден</div>;
    if (error) return <div>Ошибка: {error}</div>;


    const previusPage = document.referrer;


    return (
        <div className='detail_box'>
            <h1>{post[0].title}</h1>
            <div className='content' dangerouslySetInnerHTML={{ __html: post[0].content }} />
            <p>{post[0].date_created}</p>
            {
                localStorage.getItem('role') === null ?
                    <Link to="/student">Перейти к записям</Link>
                    :
                <button className='button_back' onClick={() => window.history.back()}>Назад</button>
            }
        </div>
    );
};

export default PostDetail