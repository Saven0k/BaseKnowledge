import "./style.css";

import ControlUsers from "../ControlUsers/ControlUsers";
import Statistics from "../Statistics/Statistics";
import { useEffect, useState } from "react";
import Header from '../header/Header'
import CreatePostComponent from "../CreatePostComponent/CreatePostComponent";
import PostList from "../List/List";
import ControlRoles from "../Controls/ControlRoles/ControlRoles";
import ControlGroups from "../Controls/ControlGroups/ControlGroups";
import ControlCitites from "../Controls/ControlCities/ControlCities";
import PostsSelector from "../Selectors/PostsSelector/PostsSelector";

/**
 * React component, which creates AdminComponent with some details.
 * @returns 
 */
const AdminComponent = () => {
	const [activeIndex, setActiveIndex] = useState(null);
	const [page, setPage] = useState(0);

	const [loadedComponents, setLoadedComponents] = useState({
		staticstic: true,
		users: false,
		createPost: false,
		posts: false,
		roles: false,
		cities: false,
		groups: false,
	})

	// useEffect(() => {
	// 	loadedComponents
	// }, [page])

	const setReady = (page, name) => {
		setPage(page)
		setLoadedComponents({ ...loadedComponents, name: true })
	}

	const handleClick = (index, type) => {
		// setLoadedComponents({...loadedComponents, teachersPosts: false, studentsPosts: false })
		setActiveIndex(activeIndex === index ? null : index);
		setLoadedComponents({ ...loadedComponents, [type]: true })

	};
	return (
		<div className="admin_comp">
			<Header />
			<div className="menu_pages">
				<button
					onClick={() => setReady(0, "staticstic")}
					className={`menu__button ${page == 0 ? 'active' : ' '}`}
				> Статистика
				</button>
				<button
					onClick={() => setReady(1, "users")}
					className={`menu__button ${page == 1 ? 'active' : ' '}`}
				> Пользователи
				</button>
				<button
					onClick={() => setReady(2, "createPost")}
					className={`menu__button ${page == 2 ? 'active' : ' '}`}
				> Добавление поста
				</button>
				<button
					onClick={() => setReady(3, "posts")}
					className={`menu__button ${page == 3 ? 'active' : ' '}`}
				> Посты
				</button>
				<button
					onClick={() => setReady(4, 'roles')}
					className={`menu__button ${page == 4 ? 'active' : ' '}`}
				> Роли
				</button>
				<button
					onClick={() => setReady(5, 'cities')}
					className={`menu__button ${page == 5 ? 'active' : ' '}`}
				> Города
				</button>
				<button
					onClick={() => setReady(6, 'groups')}
					className={`menu__button ${page == 6 ? 'active' : ' '}`}
				> Группы
				</button>
			</div>
			<div className="slider_block">
				<div className="slide">
					{page === 0 && <Statistics ready={loadedComponents.staticstic} />}
					{page === 1 && <ControlUsers ready={loadedComponents.users} />}
					{page === 2 && <CreatePostComponent />}
					{page === 3 && <PostsSelector />}
					{page === 4 && <ControlRoles />}
					{page === 5 && <ControlCitites />}
					{page === 6 && <ControlGroups />}
				</div>
			</div>

			{/* <div className="accordion">
				<div className="accordion-item">
					<button
						className="accordion-button"
						onClick={() => handleClick(0, "createPost")}
						style={{ backgroundColor: activeIndex === 0 ? "#3739dd" : "#f1f1f1", position: activeIndex === 0 ? "sticky" : "relative" }}
					>
						Добавление поста
					</button>
					<div
						className={`accordion-content ${activeIndex === 0 ? 'open' : ''
							}`}
					>
						<CreatePostComponent />
					</div>
				</div>
				<div className="accordion-item">
					<button
						className="accordion-button"
						onClick={() => handleClick(1, "users")}
						style={{ backgroundColor: activeIndex === 1 ? "#3739dd" : "#f1f1f1", position: activeIndex === 1 ? "sticky" : "relative" }}
					>
						Работа с пользователями
					</button>
					<div
						className={`accordion-content ${activeIndex === 1 ? 'open' : ''
							}`}
					>
						<ControlUsers ready={loadedComponents.users} />
					</div>
				</div>
				<div className="accordion-item">
					<button
						className="accordion-button"
						onClick={() => handleClick(2, "studentsPosts")}
						style={{ backgroundColor: activeIndex === 2 ? "#3739dd" : "#f1f1f1", position: activeIndex === 2 ? "sticky" : "relative" }}
					>
						Посты студентов
					</button>
					<div
						className={`accordion-content ${activeIndex === 2 ? 'open' : ''
							}`}
					>
						<PostList ready={loadedComponents.studentsPosts} type={"student"} />
					</div>
				</div>
				<div className="accordion-item">
					<button
						className="accordion-button"
						onClick={() => handleClick(3, "teachersPosts")}
						style={{ backgroundColor: activeIndex === 3 ? "#3739dd" : "#f1f1f1", position: activeIndex === 3 ? "sticky" : "relative" }}
					>
						Посты преподавателей
					</button>
					<div
						className={`accordion-content ${activeIndex === 3 ? 'open' : ''
							}`}
					>
						<PostList ready={loadedComponents.teachersPosts} type={"teacher"} />
					</div>
				</div>
				
				
			</div> */}
		</div>

	);
};
export default AdminComponent;