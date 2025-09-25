import './CreatePostComponent.css'
import { useState, useRef } from 'react';
import { addPost } from '../../services/ApiToServer/posts';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import QuillTextEditor from '../QuillTextEditor/QuillTextEditor';
import GroupSelector from '../EntitWidgets/GroupSelector/GroupSelector';
import CitySelector from '../EntitWidgets/CitySelector/CitySelector';
import FormSelector from '../EntitWidgets/FormSelector/FormSelector';

const CreatePostComponent = () => {
    const [role, setRole] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(false);
    const [role_context, setRoleContext] = useState([]); // ИСПРАВЛЕНО: начальное значение должно быть массивом, а не строкой
    const fileInputRef = useRef(null);

    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Сохраняет пост, отправляя данные на сервер
     */
    const savePost = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append('title', title.trim());
            data.append('content', content);
            data.append('role', role || 'null'); 
            data.append('role_context', role_context); 
            data.append('status', status ? "1" : "0");
            data.append('file', image === null ? null : image);

            await addPost(data);

            // Сброс формы после успешного сохранения
            setTitle('');
            setContent('');
            setRole('null');
            setRoleContext("null");
            setStatus(false);
            clearImage();
        } catch (error) {
            console.error('Ошибка при сохранении поста:', error);
            alert('Произошла ошибка при сохранении поста'); 
        } finally {
            setIsSubmitting(false);
        }
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
        <div className='add-post'>
            <div className='add-post__image-load'>
                <label className='add-post__image-label' htmlFor="image">Image</label>
                <input
                    className='add-post__input-file'
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*"
                />
                {imagePreview && (
                    <>
                        <img src={imagePreview} alt="preview" className='add-post__image-preview' />
                        <button className="add-post__image-delete" onClick={clearImage}>Удалить</button>
                    </>
                )}
            </div>
            <input
                type="text"
                placeholder="Заголовок поста"
                value={title}
                className='add-post__title-input'
                onChange={(e) => setTitle(e.target.value)}
            />
            <QuillTextEditor setContent={setContent} newContent={content} />
            <div className='selection_component'>
                <select
                    className='selection-component__select'
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
                        checked={status}
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