import './CreatePostComponent.css'
import React, { useState, useRef, useEffect } from 'react';
import GroupSelector from '../Selectors/GroupSelector/GroupSelector';
import { addPost } from '../../services/ApiToServer/posts';
import { getStudentGroups } from '../../services/ApiToServer/groups';


const CreatePostComponent = () => {

    const [typeVisible, setTypeVisible] = useState(''); //UseState for type of visible
    const [title, setTitle] = useState(''); // UseState for Posts title
    const [content, setContent] = useState(''); // UseState for Posts content
    const [publicPost, setPublicPost] = useState(false); // UseState for visible content
    const [styles, setStyles] = useState({
        color: '#000000',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStyle: 'normal',
    }); // UseState for contents styles

    const editorRef = useRef(null); // UseRef for edit content
    const lastSelectionRef = useRef(null); // Сохраняем последнюю позицию курсора
    // const [imagePreview, setImagePreview] = useState(null); // Для превью изображения
    // const [image, setImage] = useState(null)

    const [groupList, setGroupList] = useState([])

    const [citiesList, setCitiesList] = useState([])

    // const [group, setGroup] = useState('none')
    const [groups, setGroups] = useState(null)

    // Сохраняем выделение (курсор)
    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            lastSelectionRef.current = selection.getRangeAt(0);
        }
    };

    // Восстанавливаем выделение (курсор)
    const restoreSelection = () => {
        if (lastSelectionRef.current) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(lastSelectionRef.current);
        }
    };

    // Применить стиль к выделенному тексту
    const applyStyleToSelection = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        const span = document.createElement('span');
        span.style.color = styles.color;
        span.style.fontSize = styles.fontSize;
        span.style.fontWeight = styles.fontWeight;
        span.style.fontStyle = styles.fontStyle;
        span.textContent = selectedText;

        range.deleteContents();
        range.insertNode(span);

        // Обновляем состояние content
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
        restoreSelection(); // Восстанавливаем курсор
        setStyles({ ...styles, color: '#000000', fontSize: '14px', fontWeight: 'normal', fontStyle: 'normal' })

    };

    // const handleFileChange = (e) => {
    //     if (e.target.files[0]) {
    //         const selectedFile = e.target.files[0];
    //         setImage(e.target.files[0])
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //             // setImage(event.target.result)
    //             setImagePreview(event.target.result); // Сохраняем Data URL для превью
    //         };
    //         reader.readAsDataURL(selectedFile);
    //     }
    // }

    const sectionHandleClick = async () => {
        if (groupList.length !== 0) {
            return ''
        }
        else {
            const groups = await getStudentGroups();
            setGroupList(groups.map(obj => obj.name));
        }
    }

    // Автоматически применяем стили при их изменении
    useEffect(() => {
        applyStyleToSelection();
    }, [styles.color, styles.fontSize, styles.fontWeight, styles.fontStyle]);

    // Сохраняем пост на сервер
    const savePost = () => {

        // if (image !== null) {
        //     const data = new FormData();
        //     data.append('title', title);
        //     data.append('content', content);
        //     data.append('typeVisible', typeVisible);
        //     data.append('student_group', group);
        //     data.append('public_post', publicPost);
        //     // data.append('image', image);
        //     addPostWithImage(data)
        // }
        // else {
        addPost(title, content, typeVisible, publicPost, groups)
        // }
        setTitle('');
        setContent('');
        // setImage(null);
        // setImagePreview('');
        // setGroup("none")
        setGroups(null)
    };
    const handleContentChange = () => {
        setContent(editorRef.current)
    }

    return (
        <div className='addPost_component'>
            {/* <div>
                <label htmlFor="">Image</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*"
                />
                {imagePreview &&
                    <img src={imagePreview} alt="dadada" />}
            </div> */}
            <input
                type="text"
                placeholder="Заголовок поста"
                value={title}
                className='title_input'
                onChange={(e) => setTitle(e.target.value)}
            />
            <div
                ref={editorRef}
                onChange={handleContentChange}
                contentEditable
                onBlur={saveSelection} // Сохраняем позицию при потере фокуса
                onMouseUp={saveSelection} // Сохраняем позицию при выделении мышью
                onKeyUp={saveSelection} // Сохраняем позицию при вводе с клавиатуры
                dangerouslySetInnerHTML={{ __html: content }}
                className='content_input'
            />
            <div className='style_component'>
                <h3>Стили:</h3>
                <div className='styles_buttons'>
                    <input
                        type="color"
                        value={styles.color}
                        onChange={(e) => setStyles({ ...styles, color: e.target.value })}
                    />
                    <select
                        value={styles.fontSize}
                        onChange={(e) => setStyles({ ...styles, fontSize: e.target.value })}
                    >
                        <option value="12px">12px</option>
                        <option value="16px">16px</option>
                        <option value="20px">20px</option>
                    </select>
                    <button
                        className='bold_button'
                        onClick={() =>
                            setStyles({
                                ...styles,
                                fontWeight: styles.fontWeight === 'bold' ? 'normal' : 'bold',
                            })
                        }
                    >
                        Ж
                    </button>
                    <button
                        onClick={() =>
                            setStyles({
                                ...styles,
                                fontStyle: styles.fontStyle === 'italic' ? 'normal' : 'italic',
                            })
                        }
                    >
                        К
                    </button>
                </div>
            </div>
            <div className='selection_component'>
                <select
                    className='visible_select'
                    value={typeVisible}
                    onChange={(e) => setTypeVisible(e.target.value)}
                >

                    <option value="none">Не выбрано</option>
                    <option value="student">Студентам</option>
                    <option value="teacher">Учителям</option>
                    <option value="all">Всем</option>
                    <option value="city">Городу</option>
                </select>
                {typeVisible === 'student' &&
                    <GroupSelector saveGroupList={setGroups} />
                }
                {typeVisible === 'city' && 
                    <CitySelector saveCitiesList={setCitiesList} />
                }
            </div>
            <div className="modal-form-group">
                <label>
                    <input
                        type="checkbox"
                        name="publicPost"
                        checked={publicPost} // Добавляем привязку к состоянию
                        onChange={(e) => setPublicPost(e.target.checked)}
                    />
                    Публичный пост
                </label>
            </div>
            <button className='button_save_post' onClick={savePost}>Сохранить пост</button>
        </div>
    );
};

export default CreatePostComponent;