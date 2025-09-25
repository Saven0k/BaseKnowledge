import './PostDetail.css'

import { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

import { getImage, getPost } from '../../services/ApiToServer/posts';

const PostDetail = ({ id }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null); // Вопросом стоит null || ''

    const userRole = localStorage.getItem('role');

    const previusPage = document.referrer;

    const navigate = useNavigate();

    useEffect(() => {
        const loadPost = async () => {
            if (!id) {
                setError("Id поста не указан")
                setLoading(false)
                return;
            }

            try {
                setLoading(true)
                setError(null)

                const data = await getPost(id);

                if (!data) throw new Error("Пост не найден");

                setPost(data)

                if (data.image_path) {
                    try {
                        const imageData = await getImage(data.image_path);
                        setImage(imageData);
                    } catch (imgError) {
                        console.warn('Не удалось загрузить изображение:', imgError);
                        setImage(null);
                    }
                } else {
                    setImage(null);
                }
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

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className="detail-box detail-box--loading">
                <div className="detail-box__loading">Загрузка поста...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detail-box detail-box--error">
                <div className="detail-box__error">
                    <h2>Ошибка</h2>
                    <p>{error}</p>
                    <Link to="/" className="detail-box__link">На главную</Link>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="detail-box detail-box--not-found">
                <div className="detail-box__not-found">
                    <h2>Пост не найден</h2>
                    <p>Запрошенный пост не существует или был удален</p>
                    <Link to="/" className="detail-box__link">На главную</Link>
                </div>
            </div>
        );
    }


    return (
        <div className='detail-box'>
            <div className="detail-box__content">
                <h1 className='detail-box__title'>{post.title}</h1>

                {image && (
                    <div className="detail-box__image-mobile">
                        <img
                            src={image}
                            className='detail-box__image-path'
                            alt={`Иллюстрация к посту: ${post.title}`} 
                            loading='lazy'
                            onError={() => setImage(null)} 
                        />
                    </div>
                )}

                <div
                    className='detail-box__post'
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <p className='detail-box__date'>
                    {new Date(post.date_created).toLocaleDateString('ru-RU', { 
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>

                <div className="detail-box__actions">
                    {!userRole ? (
                        <Link to="/student" className="detail-box__link detail-box__link--primary">
                            Перейти к записям
                        </Link>
                    ) : (
                        <button
                            className='detail-box__button-back'
                            onClick={handleBack}
                            type="button" 
                        >
                            Назад
                        </button>
                    )}

                    <Link to="/" className="detail-box__link detail-box__link--secondary">
                        На главную
                    </Link>
                </div>
            </div>

            {image && (
                <aside className="detail-box__sidebar"> 
                    <div className="detail-box__image">
                        <img
                            src={image}
                            className='detail-box__image-path'
                            alt={`Иллюстрация к посту: ${post.title}`}
                            loading='lazy'
                            onError={() => setImage(null)}
                        />
                    </div>
                </aside>
            )}
        </div>
    );
};

export default PostDetail