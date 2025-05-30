import React, { useState, useEffect, useRef } from 'react';
import './EditPostModal.css';
import { useNavigate } from 'react-router-dom';
import { getPost, updatePost } from '../../services/ApiToServer/posts';
import { getStudentGroups } from '../../services/ApiToServer/groups';
import GroupSelector from '../Selectors/GroupSelector/GroupSelector';
import CitySelector from '../Selectors/CitySelector/CitySelector';
import FormSelector from '../Selectors/FormSelector/FormSelector';

const EditPostModal = ({ postId, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [IdPost, setIdPost] = useState();
  const [PostD, setPostD] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const editorRef = useRef(null);
  const lastSelectionRef = useRef(null);
  const modalRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const [editedPost, setEditedPost] = useState({
    title: '',
    content: '',
    role: '',
    status: false,
    role_context: 'none'
  });

  const [styles, setStyles] = useState({
    color: '#000000',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
  });

  useEffect(() => {
    const loadPostData = async () => {
      try {
        setIsLoading(true);
        const postData = await getPost(postId);
        setPostD(postData)
        setIdPost(postId)
        setRole(postData.role)
        setEditedPost({
          title: postData.title,
          content: postData.content,
          role: postData.role,
          status: postData.status === "1" ? true : false,
          role_context: postData.role_context
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки данных поста:', error);
        setIsLoading(false);
        onClose();
      }
    };

    if (postId) {
      loadPostData();
    }
  }, [postId, onClose]);


  const startSaveTimer = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      lastSelectionRef.current = selection.getRangeAt(0);
    }
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    
    setTimeLeft(2); 
    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1); 
    }, 1000);

    
    saveTimeoutRef.current = setTimeout(() => {
      if (editorRef.current && editorRef.current.innerHTML !== editedPost.content) {
        const newContent = editorRef.current.innerHTML;
        setEditedPost(prev => ({ ...prev, content: newContent }));
        console.log('Автосохранение выполнено:', newContent);
      }
      setTimeLeft(null); 
      clearInterval(countdownIntervalRef.current);
    }, 2000);
  };

  
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Восстанавливаем выделение текста
  const restoreSelection = () => {
    if (lastSelectionRef.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(lastSelectionRef.current);
    }
  };

  // Применяем стили к выделенному тексту
  const applyStyleToSelection = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const span = document.createElement('span');
    span.style.color = styles.color;
    span.style.fontSize = styles.fontSize;
    span.style.fontWeight = styles.fontWeight;
    span.style.fontStyle = styles.fontStyle;
    span.textContent = selectedText;

    range.deleteContents();
    range.insertNode(span);

    if (editorRef.current) {
      setEditedPost(prev => ({ ...prev, content: editorRef.current.innerHTML }));
    }
    restoreSelection();
  };

  useEffect(() => {
    applyStyleToSelection();
  }, [styles]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? "checked" : value
    }));
  };

  const handleSave = async () => {
    try {
      const updatedPosts = await updatePost(IdPost, editedPost.title, editedPost.content, editedPost.role, editedPost.status, editedPost.role_context);
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

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const setRoleContext = (type) => {
    setEditedPost(prev => ({
      ...prev,
      role_context: type,
    }))
  }

  if (!postId) return null;

  const handleChangeSelectedRole = (role) => {
    setEditedPost({ ...editedPost, role: role })
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2>Редактирование поста</h2>

        {isLoading ? (
          <div className="modal-loading">Загрузка данных...</div>
        ) : (
          <>
            <div className="modal-form-group">
              <label>Заголовок:</label>
              <input
                type="text"
                name="title"
                value={editedPost.title}
                onChange={handleChange}
                className="modal-input"
              />
            </div>

            <div className="modal-form-group">
              <label>Содержание:</label>
              {timeLeft !== null && (
                <div className="save-countdown">
                  {timeLeft > 0 ? (
                    <span>Текст сохранится через {timeLeft} сек...</span>
                  ) : (
                    <span>✓ Сохранено</span>
                  )}
                </div>
              )}
              <div
                ref={editorRef}
                contentEditable
                onBlur={startSaveTimer}
                onMouseUp={startSaveTimer}
                onKeyUp={startSaveTimer}
                dangerouslySetInnerHTML={{ __html: editedPost.content }}
                className="modal-editor"
              />
            </div>

            <div className="modal-form-group">
              <label>Стили текста:</label>
              <div className="style-controls">
                <input
                  type="color"
                  value={styles.color}
                  onChange={(e) => setStyles(prev => ({ ...prev, color: e.target.value }))}
                  className="style-input"
                />
                <select
                  value={styles.fontSize}
                  onChange={(e) => setStyles(prev => ({ ...prev, fontSize: e.target.value }))}
                  className="style-select"
                >
                  <option value="12px">12px</option>
                  <option value="16px">16px</option>
                  <option value="20px">20px</option>
                  <option value="24px">24px</option>
                </select>
                <button
                  className={`style-button ${styles.fontWeight === 'bold' ? 'active' : ''}`}
                  onClick={() => setStyles(prev => ({
                    ...prev,
                    fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold'
                  }))}
                >
                  Ж
                </button>
                <button
                  className={`style-button ${styles.fontStyle === 'italic' ? 'active' : ''}`}
                  onClick={() => setStyles(prev => ({
                    ...prev,
                    fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic'
                  }))}
                >
                  К
                </button>
              </div>
            </div>
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

            <div className="modal-form-group">
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

            <div className="modal-actions">
              <button className="modal-button cancel" onClick={onClose}>Отмена</button>
              <button className="modal-button save" onClick={handleSave}>Сохранить</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default EditPostModal;
