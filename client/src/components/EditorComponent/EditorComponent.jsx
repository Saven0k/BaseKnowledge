import "./style.css";

import { useState } from "react";
import Header from '../header/Header'
import CreatePostComponent from "../CreatePostComponent/CreatePostComponent";
import PostsSelector from "../EntitWidgets/PostsSelector/PostsSelector";


const EditorComponent = () => {
    const [page, setPage] = useState(0);

    return (
        <div className="editor-component">
            <Header />
            <nav className="menu-pages" aria-label="Навигация по редактору">
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
            </nav>
            <main className="slider-block">
                <div className="slide">
                    {page === 0 && <CreatePostComponent />}
                    {page === 1 && <PostsSelector />}
                </div>
            </main>
        </div>
    );
}

export default EditorComponent;