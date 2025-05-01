import { useEffect, useState } from 'react';
import { getPost } from '../../services/workWithBd';
import './PostDetail.css'
import { Link } from 'react-router-dom';
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

    return (
        <div className='detail_box'>
            <h1>{post[0].name}</h1>
            <div className='content' dangerouslySetInnerHTML={{ __html: post[0].text }} />
            <p>{post[0].date_created}</p>
            {
                localStorage.getItem('role') === "teacher" ?
                    <Link to="/teacher">Вернуться к списку</Link>
                    :
                    <Link to="/student">Вернуться к списку</Link>
            }
        </div>
    );
};

export default PostDetail