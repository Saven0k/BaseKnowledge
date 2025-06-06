import "./style.css";

import ControlUsers from "../ControlUsers/ControlUsers";
import Statistics from "../Statistics/Statistics";
import { useState } from "react";
import Header from '../header/Header'
import CreatePostComponent from "../CreatePostComponent/CreatePostComponent";
import ControlRoles from "../Controls/ControlRoles/ControlRoles";
import ControlGroups from "../Controls/ControlGroups/ControlGroups";
import ControlCitites from "../Controls/ControlCities/ControlCities";
import PostsSelector from "../Selectors/PostsSelector/PostsSelector";

/**
 * React component, which creates AdminComponent with some details.
 * @returns 
 */
const AdminComponent = () => {
	const [page, setPage] = useState(0);

	return (
		<div className="admin_comp">
			<Header />
			<div className="menu_pages">
				<button
					onClick={() => setPage(0)}
					className={`menu__button ${page == 0 ? 'active' : ' '}`}
				> Статистика
				</button>
				<button
					onClick={() => setPage(1)}
					className={`menu__button ${page == 1 ? 'active' : ' '}`}
				> Пользователи
				</button>
				<button
					onClick={() => setPage(2)}
					className={`menu__button ${page == 2 ? 'active' : ' '}`}
				> Добавление поста
				</button>
				<button
					onClick={() => setPage(3)}
					className={`menu__button ${page == 3 ? 'active' : ' '}`}
				> Посты
				</button>
				<button
					onClick={() => setPage(4)}
					className={`menu__button ${page == 4 ? 'active' : ' '}`}
				> Роли
				</button>
				<button
					onClick={() => setPage(5)}
					className={`menu__button ${page == 5 ? 'active' : ' '}`}
				> Города
				</button>
				<button
					onClick={() => setPage(6)}
					className={`menu__button ${page == 6 ? 'active' : ' '}`}
				> Группы
				</button>
			</div>
			<div className="slider_block">
				<div className="slide">
					{page === 0 && <Statistics  />}
					{page === 1 && <ControlUsers  />}
					{page === 2 && <CreatePostComponent />}
					{page === 3 && <PostsSelector />}
					{page === 4 && <ControlRoles />}
					{page === 5 && <ControlCitites />}
					{page === 6 && <ControlGroups />}
				</div>
			</div>
		</div>
	);
};
export default AdminComponent;