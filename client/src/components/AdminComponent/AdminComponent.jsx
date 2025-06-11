import "./style.css";

import Statistics from "../Statistics/Statistics";
import { useState } from "react";
import Header from '../header/Header'
import CreatePostComponent from "../CreatePostComponent/CreatePostComponent";
import ControlRoles from "../Controls/ControlRoles/ControlRoles";
import ControlCollegeGroups from "../Controls/ControlCollegeGroups/ControlCollegeGroups";
import ControlCitites from "../Controls/ControlCities/ControlCities";
import PostsSelector from "../EntitWidgets/PostsSelector/PostsSelector";
import ControlSpecialities from "../Controls/ControlSpecialities/ControlSpecialities";
import ControlUniversityGroups from "../Controls/ControlUniversityGroups/ControlUniversityGroups";
import ControlClasses from "../Controls/ControlClasses/ControlClasses";
import ControlUsers from "../Controls/ControlUsers/ControlUsers";

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
				> Группы колледжа
				</button>
				<button
					onClick={() => setPage(7)}
					className={`menu__button ${page == 7 ? 'active' : ' '}`}
				> Группы университета
				</button>
				<button
					onClick={() => setPage(8)}
					className={`menu__button ${page == 8 ? 'active' : ' '}`}
				> Специальности
				</button>
				<button
					onClick={() => setPage(9)}
					className={`menu__button ${page == 9 ? 'active' : ' '}`}
				> Классы
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
					{page === 6 && <ControlCollegeGroups />}
					{page === 7 && <ControlUniversityGroups />}
					{page === 8 && <ControlSpecialities />}
					{page === 9 && <ControlClasses />}
				</div>
			</div>
		</div>
	);
};
export default AdminComponent;