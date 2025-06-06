import './CreatePostComponent.css'
import React, { useState, useRef, useEffect } from 'react';
import GroupSelector from '../Selectors/GroupSelector/GroupSelector';
import { addPost } from '../../services/ApiToServer/posts';
import CitySelector from '../Selectors/CitySelector/CitySelector';
import FormSelector from '../Selectors/FormSelector/FormSelector';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import Quill from "quill";
import QuillTextEditor from '../QuillTextEditor/QuillTextEditor';

const CreatePostComponent = () => {
    const [role, setRole] = useState(''); //UseState for type of visible
    const [title, setTitle] = useState(''); // UseState for Posts title
    const [content, setContent] = useState(''); // UseState for Posts content
    const [status, setStatus] = useState(false); // UseState for visible content
    const [role_context, setRoleContext] = useState(["null"])
    const fileInputRef = useRef(null);

    const [imagePreview, setImagePreview] = useState(''); // Для превью изображения
    const [image, setImage] = useState(null);

    // Сохраняем пост на сервер
    const savePost = () => {
        const data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('role', role);
        data.append('role_context', role_context);
        data.append('status', status ? "1" : "0");
        data.append('file', image === null ? null : image);
        addPost(data)


        setTitle('');
        setContent('');
        clearImage()
        setRole("null")
        setRoleContext("null")
        
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    // Функция для очистки
    const clearImage = () => {
        setImage("");
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className='addPost_component'>
            <div className='image_load'>
                <label htmlFor="image">Image</label>
                <input
                    ref={fileInputRef} // Привязываем ref
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*"
                />
                {imagePreview && (
                    <>
                        <img src={imagePreview} alt="preview" className='image_preview' />
                        <button className="button_delete_photo" onClick={clearImage}>Удалить</button>
                    </>
                )}
            </div>
            <input
                type="text"
                placeholder="Заголовок поста"
                value={title}
                className='title_input'
                onChange={(e) => setTitle(e.target.value)}
            />
            <QuillTextEditor setContent={setContent} newContent={content}/>
            <div className='selection_component'>
                <select
                    className='visible_select'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="a">Не выбрано</option>
                    <option value="form">По форме обучения</option>
                    <option value="student">Студентам</option>
                    <option value="teacher">Учителям</option>
                    <option value="all">Всем</option>
                    <option value="city">Городу</option>
                </select>
                {role === 'student' &&
                    <GroupSelector saveGroupList={setRoleContext} />
                }
                {role === 'city' &&
                    <CitySelector saveCity={setRoleContext} />
                }
                {role === 'form' &&
                    <FormSelector saveForm={setRoleContext} />
                }
            </div>
            <div className="modal-form-group">
                <label>
                    <input
                        type="checkbox"
                        name="publicPost"
                        checked={status} // Добавляем привязку к состоянию
                        onChange={(e) => setStatus(e.target.checked)}
                    />
                    Публичный пост
                </label>
            </div>
            <button className='button_save_post' onClick={savePost}>Сохранить пост</button>
        </div>
    );
};

export default CreatePostComponent;