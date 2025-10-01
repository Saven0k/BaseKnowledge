import "./style.css";

import Statistics from "../Statistics/Statistics";
import { memo, useState } from "react";
import Header from '../header/Header'
import CreatePostComponent from "../CreatePostComponent/CreatePostComponent";
import ControlRoles from "../Controls/ControlRoles/ControlRoles";
import ControlCitites from "../Controls/ControlCities/ControlCities";
import PostsSelector from "../EntitWidgets/PostsSelector/PostsSelector";
import ControlSpecialities from "../Controls/ControlSpecialities/ControlSpecialities";
import ControlUsers from "../Controls/ControlUsers/ControlUsers";
import ControlGroups from "../Controls/ControlGroups/ControlGroups";

const AdminComponent = () => {
	const LOCALKEY = "adPage"

	const [page, setPage] = useState(+localStorage.getItem(LOCALKEY));
	const setPages = (id) => {
		localStorage.setItem(LOCALKEY, id)
		setPage(id)
	}
	return (
		<div className="admin_comp">
			<Header />
			<div className="menu-pages">
				<button
					onClick={() => setPages(0)}
					className={`menu__button ${page == 0 ? 'active' : ' '}`}
				> Статистика
				</button>
				<button
					onClick={() => setPages(1)}
					className={`menu__button ${page == 1 ? 'active' : ' '}`}
				> Пользователи
				</button>
				<button
					onClick={() => setPages(2)}
					className={`menu__button ${page == 2 ? 'active' : ' '}`}
				> Добавление поста
				</button>
				<button
					onClick={() => setPages(3)}
					className={`menu__button ${page == 3 ? 'active' : ' '}`}
				> Посты
				</button>
				<button
					onClick={() => setPages(4)}
					className={`menu__button ${page == 4 ? 'active' : ' '}`}
				> Роли
				</button>
				<button
					onClick={() => setPages(5)}
					className={`menu__button ${page == 5 ? 'active' : ' '}`}
				> Города
				</button>
				<button
					onClick={() => setPages(6)}
					className={`menu__button ${page == 6 ? 'active' : ' '}`}
				> Группы
				</button>

				<button
					onClick={() => setPages(8)}
					className={`menu__button ${page == 8 ? 'active' : ' '}`}
				> Специальности
				</button>

			</div>
			<div className="slider_block">
				<div className="slide">
					{page === 0 && <Statistics />}
					{page === 1 && <ControlUsers />}
					{page === 2 && <CreatePostComponent />}
					{page === 3 && <PostsSelector />}
					{page === 4 && <ControlRoles />}
					{page === 5 && <ControlCitites />}
					{page === 6 && <ControlGroups />}
					{page === 8 && <ControlSpecialities />}
				</div>
			</div>
		</div>
	);
};
export default AdminComponent;