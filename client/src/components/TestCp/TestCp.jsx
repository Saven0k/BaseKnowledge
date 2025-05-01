import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TextEditor = ({ isEditMode = false }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/posts/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error('Ошибка загрузки:', error);
        }
      };
      fetchPost();
    }
  }, [id, isEditMode]);

  const handleFormat = (format, value) => {
    const selection = window.getSelection();
    if (!selection.toString()) return;
    
    const span = document.createElement('span');
    span.style[format] = value;
    span.textContent = selection.toString();
    
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
    
    setContent(document.getElementById('editable').innerHTML);
  };

  const handleSave = async () => {
    try {
      if (isEditMode && id) {
        await axios.put(`/api/posts/${id}`, { title, content });
        alert('Изменения сохранены!');
      } else {
        await axios.post('/api/posts', { title, content });
        alert('Создано успешно!');
      }
      navigate('/admin/posts');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  return (
    <div className="editor-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        className="title-input"
      />
      
      <div className="toolbar">
        <button onClick={() => handleFormat('fontSize', '18px')}>Больше</button>
        <button onClick={() => handleFormat('fontSize', '12px')}>Меньше</button>
        <button onClick={() => handleFormat('fontStyle', 'italic')}>Курсив</button>
        <button onClick={() => handleFormat('fontWeight', 'bold')}>Жирный</button>
        <button onClick={() => handleFormat('color', 'red')}>Красный</button>
        <button onClick={() => handleFormat('color', 'blue')}>Синий</button>
        <button onClick={() => handleFormat('textDecoration', 'underline')}>Подчеркнутый</button>
      </div>
      
      <div
        id="editable"
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={(e) => setContent(e.target.innerHTML)}
        className="editable-area"
      />
      
      <button onClick={handleSave} className="save-button">
        {isEditMode ? 'Сохранить изменения' : 'Сохранить'}
      </button>
    </div>
  );
};

export default TextEditor;