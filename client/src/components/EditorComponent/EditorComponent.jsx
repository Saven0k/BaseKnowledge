import "./style.css";

import { useState } from "react";
import Header from '../header/Header'
import CreatePostComponent from "../CreatePostComponent/CreatePostComponent";
import PostsSelector from "../Selectors/PostsSelector/PostsSelector";


const EditorComponent = () => {
    const [page, setPage] = useState(0);

    return (
        <div className="admin_component">
            <Header />
            <div className="menu_pages">
                <button
                    onClick={() => setPage(0)}
                    className={`menu__button ${page === 0 ? 'active' : ' '}`}
                > Добавление поста
                </button>
                <button
                    onClick={() => setPage(1)}
                    className={`menu__button ${page === 1 ? 'active' : ' '}`}
                > Посты
                </button>
            </div>
            <div className="slider_block">
                <div className="slide">
                    {page === 0 && <CreatePostComponent />}
                    {page === 1 && <PostsSelector />}
                </div>
            </div>
        </div>
    );
}

export default EditorComponent;