import { useState, useEffect, useRef, useCallback } from 'react';
import './EditPostModal.css';
import { useNavigate } from 'react-router-dom';
import { getPost, updatePost } from '../../services/ApiToServer/posts';
import QuillTextEditor from '../QuillTextEditor/QuillTextEditor';
import GroupSelector from '../EntitWidgets/GroupSelector/GroupSelector';
import CitySelector from '../EntitWidgets/CitySelector/CitySelector';
import FormSelector from '../EntitWidgets/FormSelector/FormSelector';

const EditPostModal = ({ postId: Idpost, onClose, onSave }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [role, setRole] = useState('');
  const [postId, setPostD] = useState('');
  const [IdPost, setIdPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [editedPost, setEditedPost] = useState({
    title: '',
    content: '',
    role: '',
    status: false,
    role_context: 'none'
  });

  useEffect(() => {
    const loadPostData = useCallback(async () => {
      try {
        setIsLoading(true);

        const postData = await getPost(Idpost);

        setPostD(postData)
        setIdPost(Idpost)
        setRole(postData.role)

        setEditedPost({
          title: postData.title || '',
          content: postData.content || '',
          role: postData.role || '',
          status: postData.status === "1" ? true : false,
          role_context: postData.role_context || 'null'
        });
      } catch (error) {
        console.error('Ошибка загрузки данных поста:', error);
        setIsLoading(false);
        onClose();
      } finally {
        setIsLoading(false);
      }
    });

    if (Idpost) {
      loadPostData();
    }
  }, [Idpost, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? "checked" : value
    }));
  };

  const handleSave = async () => {
    try {
      const updatedPosts = await updatePost(
        IdPost,
        editedPost.title,
        editedPost.content,
        editedPost.role,
        editedPost.status,
        editedPost.role_context
      );

      if (updatedPosts) {
        onSave(updatedPosts);
        onClose();
      } else {
        navigate('/404')
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  const handleBackdropClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  });

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  const setRoleContext = (type) => {
    setEditedPost(prev => ({
      ...prev,
      role_context: type,
    }))
  }

  if (!Idpost) return null;

  const handleChangeSelectedRole = (role) => {
    setEditedPost({ ...editedPost, role: role })
  }

  const setContentText = (newContent) => {
    setEditedPost({ ...editedPost, content: newContent })
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal__content" ref={modalRef}>
        <button
          className="modal__close-button"
          onClick={onClose}
        >
          ×
        </button>
        <h2>Редактирование поста</h2>

        {isLoading ? (
          <div className="modal__loading">Загрузка данных...</div>
        ) : (
          <>
            <div className="modal__form-group">
              <label>Заголовок:</label>
              <input
                type="text"
                name="title"
                value={editedPost.title}
                onChange={handleChange}
                className="modal__input"
              />
            </div>
            <QuillTextEditor setContent={setContentText} value={editedPost.content} />

            <select
              className='visible_select'
              value={editedPost.role}
              onChange={(e) => handleChangeSelectedRole(e.target.value)}
            >
              <option value="none">Не выбрано</option>
              <option value="student">Студентам</option>
              <option value="teacher">Учителям</option>
              <option value="all">Всем</option>
              <option value="city">Городу</option>
              <option value="form">Форма обучения</option>
            </select>
            {editedPost.role === 'student' &&
              <GroupSelector saveGroupList={setRoleContext} />
            }
            {editedPost.role === 'city' &&
              <CitySelector saveCity={setRoleContext} />
            }
            {editedPost.role === 'form' &&
              <FormSelector saveForm={setRoleContext} />
            }

            <div className="modal__form-group">
              <label>
                <input
                  type="checkbox"
                  name="publicPost"
                  checked={editedPost.status}
                  onChange={(e) => setEditedPost({ ...editedPost, status: e.target.checked })}
                />
                Публичный пост
              </label>
            </div>

            <div className="modal__actions">
              <button className="modal__button cancel" onClick={onClose}>Отмена</button>
              <button className="modal__button save" onClick={handleSave}>Сохранить</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default EditPostModal;
