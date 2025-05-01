import "./style.css";

import ControlUsers from "../ControlUsers/ControlUsers";
import Statistics from "../Statistics/Statistics";
import {useEffect, useState } from "react";
import Header from '../header/Header'
import CreatePostComponent from "../CreatePostComponent/CreatePostComponent";
import PostList from "../List/List";

/**
 * React component, which creates AdminComponent with some details.
 * @returns 
 */
const AdminComponent = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const [loadedComponents, setLoadedComponents] = useState({
		createPost: false,
		users: false,
		teachersPosts: false,
		studentsPosts: false,
		staticstic: false,
	})

	const handleClick = (index, type) => {
			// setLoadedComponents({...loadedComponents, teachersPosts: false, studentsPosts: false })
			setActiveIndex(activeIndex === index ? null : index);
			setLoadedComponents({...loadedComponents, [type]:true})

	};
	return (
		<div className="admin_comp">
			<Header />
			<div className="accordion">
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
						<PostList ready={loadedComponents.studentsPosts} type={"student"}/>
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
				{/* <div className="accordion-item">
					<button
						className="accordion-button"
						onClick={() => handleClick(4)}
						style={{ backgroundColor: activeIndex === 4 ? "#3739dd" : "#f1f1f1", position: activeIndex === 4 ? "sticky" : "relative" }}
					>
						Работа с постами родителей
					</button>
					<div
						className={`accordion-content ${activeIndex === 4 ? 'open' : ''
							}`}
					>
					{/* </div> */}
				{/* </div> }  */}
				<div className="accordion-item">
					<button
						className="accordion-button"
						onClick={() => handleClick(5, "staticstic")}
						style={{ backgroundColor: activeIndex === 5 ? "#3739dd" : "#f1f1f1", position: activeIndex === 5 ? "sticky" : "relative" }}
					>
						Статистика базы знаний
					</button>
					<div
						className={`accordion-content ${activeIndex === 5 ? 'open' : ''
							}`}
					>
						<Statistics  ready={loadedComponents.staticstic}/>
					</div>
				</div>
			</div>
		</div>

	);
};
export default AdminComponent;