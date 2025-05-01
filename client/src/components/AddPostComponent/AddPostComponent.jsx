import { useState } from 'react';
import { funcToTallInput } from '../../services/inputSizeFunc';
import prepareData from '../../services/prepareData';
import { addPost } from '../../services/workWithBd';
import AddButton from '../CustomButtons/AddButton/AddButton';
import './style.css'

const AddPostComponent = ({ setPostsLists, setFilteredPostsLists, type, visible }) => {
    // States for new post {name, text}
    const [nameNewPost, setNameNewPost] = useState("");
    const [textNewPost, setTextNewPost] = useState("");

    // Function for recording a new post
    const RecordingNewPost = (e) => {
        e.preventDefault();
        addPost(nameNewPost, textNewPost, type, visible);
        setNameNewPost("");
        setTextNewPost("");
        prepareData(type, setPostsLists, setFilteredPostsLists);
    };

    return (
        <div className="newPost">
            <form
                action="submit"
                className="form"
                onSubmit={(e) => RecordingNewPost(e)}
            >
                <div className="subs">
                    <h2>Добавление нового поста: </h2>
                    <div className="sub">
                        <span>Название поста</span>
                        <input
                            className="input"
                            value={nameNewPost}
                            onChange={(e) => setNameNewPost(e.target.value)}
                            maxLength={35}
                            name="name"
                            type="text"
                            placeholder="Введите название"
                        />
                    </div>
                    <div className="sub">
                        <span>Содержание поста</span>
                        <textarea
                            className="input inputLike"
                            value={textNewPost}
                            onChange={(e) => setTextNewPost(e.target.value)}
                            maxLength={1500}
                            name="text"
                            type="text"
                            placeholder="Введите содержание"
                            onKeyUp={(e) => funcToTallInput("inputLike")}
                        />
                    </div>
                </div>
                <AddButton text="Добавить пост" />
            </form>
        </div>
    );
}
export default AddPostComponent;