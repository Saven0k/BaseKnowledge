import { useEffect, useState } from 'react';
import './PostDetail.css'
import { Link } from 'react-router-dom';
import { getImage, getPost } from '../../services/ApiToServer/posts';
const PostDetail = ({ id }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState('');

    

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await getPost(id);
                const s1 = await getImage(data.image_path);
                setImage(s1)
                console.log(s1.replace('blob:', ''))
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
            <div className="text_content">
                <h1>{post.title}</h1>
                <div className='content' dangerouslySetInnerHTML={{ __html: post.content }} />
                <p>{post.date_created}</p>
                {
                    localStorage.getItem('role') === null ?
                        <Link to="/student">Перейти к записям</Link>
                        :
                        <button className='button_back' onClick={() => window.history.back()}>Назад</button>
                }
            </div>
            <div className="image_content">
                <img 
                    src={`${image}`}
                    className='image_path'
                    alt="Image"
                    loading='lazy'
                    />
            </div>
        </div>
    );
};

export default PostDetail