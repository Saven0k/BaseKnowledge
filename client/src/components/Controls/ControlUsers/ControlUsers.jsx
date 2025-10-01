import { useState, useEffect } from "react";

import "./style.css";
import eyes from './images/eyes-svg.svg'
import esc from "./images/delete.svg";

import { filterUser } from "../../../services/filterFunc";
import NothingNot from "../../PostList/NothingNot/NothingNot";
import SearchComponent from "../../SearchComponent/SearchComponent";
import { addUser, deleteUser, getUsers, updateUser } from "../../../services/ApiToServer/users";
import RoleSelector from "../../EntitWidgets/RoleSelector/RoleSelector";

const ControlUsers = ({ ready }) => {

	const [usersList, setUsersList] = useState([]);

	const [emailNewUser, setEmailNewUser] = useState("");
	const [passwordNewUser, setPasswordNewUser] = useState("");
	const [role, setRole] = useState('')

	const [filteredUsersList, setFilteredUsersList] = useState([]);

	const [searchItem, setSearchItem] = useState("");

	const [idActiveUser, setIdActiveUser] = useState(null);

	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newRole, setNewRole] = useState('')

	const [isLoading, setIsLoading] = useState(false)

	// Загрузка данных пользователей
	const loadUsers = async () => {
		try {
			setIsLoading(true)
			const users = await getUsers();
			setUsersList(users || []);
			setFilteredUsersList(users || []);
		} catch (error) {
			console.error('Ошибка при загрузке пользователей:', error);
			setUsersList([]);
			setFilteredUsersList([]);
		} finally {
			setIsLoading(false)
		}
	}

	// Сохранение обновленных данных пользователя
	const handleSaveUser = async (userId, newEmail, newPassword, countVisit, role, userRole) => {
		const roleToSave = role || userRole;

		try {
			const res = await updateUser(userId, newEmail.trim(), newPassword.trim(), countVisit, roleToSave);
			if (!res) return false;

			setIdActiveUser(null);

			const updatedUsers = usersList.map((user) =>
				user.id === userId
					? { ...user, email: newEmail.trim(), password: newPassword.trim(), countVisit, role: roleToSave }
					: user
			);

			setUsersList(updatedUsers);
			setFilteredUsersList(updatedUsers);
			return true;
		} catch (error) {
			console.error('Ошибка при обновлении пользователя:', error);
			return false;
		}
	}

	useEffect(() => {
		loadUsers();
	}, [ready]);

	// Поиск пользователей
	const handleSearch = (value) => {
		setSearchItem(value);
		setFilteredUsersList(filterUser(value, usersList));
	}

	// Добавление нового пользователя
	const handleAddUser = async (e) => {
		e.preventDefault();

		try {
			await addUser(emailNewUser.trim(), passwordNewUser.trim(), role);
			setEmailNewUser("");
			setPasswordNewUser("");
			setRole('');
			await loadUsers();
		} catch (error) {
			console.error('Ошибка при добавлении пользователя:', error);
		}
	};

	// Удаление пользователя
	const handleDeleteUser = async (userId) => {
		try {
			await deleteUser(userId);
			await loadUsers();
		} catch (error) {
			console.error('Ошибка при удалении пользователя:', error);
		}
	}

	// Активация режима редактирования
	const activateEditMode = (user) => {
		setIdActiveUser(user.id);
		setNewEmail(user.email);
		setNewPassword(user.password);
		setNewRole(user.role);
	}

	// Список пользователей
	const UsersList = () => {
		if (isLoading) {
			return <p>Загрузка пользователей...</p>;
		}

		return filteredUsersList.map((user) => (
			<div className="user-box" key={user.id}>
				<div
					className="user-box__inputs"
					style={{ gap: user.id === idActiveUser ? "10px" : "0" }}
				>
					<input
						className="user-box__input"
						value={user.id === idActiveUser ? newEmail : user.email}
						onChange={(e) => setNewEmail(e.target.value)}
						maxLength={25}
						disabled={user.id !== idActiveUser}
						style={{
							border: user.id === idActiveUser ? "1px solid #000" : "none",
						}}
						placeholder="Email"
					/>
					<input
						className="user-box__input inputText"
						value={user.id === idActiveUser ? newPassword : user.password}
						onChange={(e) => setNewPassword(e.target.value)}
						maxLength={25}
						disabled={user.id !== idActiveUser}
						style={{
							border: user.id === idActiveUser ? "1px solid #000" : "none",
						}}
						type="text"
						placeholder="Пароль"
					/>
					<div className="user-box__role">
						<h3 className={`role ${user.id === idActiveUser ? 'close' : 'open'}`}>
							{user.role}
						</h3>
						<div className={`role-select ${user.id === idActiveUser ? 'open' : 'close'}`}>
							<RoleSelector saveRole={setNewRole} role={newRole} />
						</div>
					</div>

					<div className="user-box__buttons">
						<button
							className={`change ${user.id === idActiveUser ? 'close' : 'open'}`}
							onClick={() => activateEditMode(user)}
						>
							Редактировать
						</button>
						<button
							className={`save ${user.id === idActiveUser ? 'open' : 'close'}`}
							onClick={() => {
								handleSaveUser(
									user.id,
									newEmail,
									newPassword,
									user.countVisit,
									newRole,
									user.role
								);
							}}
						>
							Сохранить
						</button>
					</div>
					<div className="user-box__visit-count">
						<img className="user-box__visit-image" src={eyes} alt="Просмотры" />
						<p>{user.countVisit || 0}</p>
					</div>
				</div>
				<img
					className="user-box__delete"
					src={esc}
					alt="Удалить"
					onClick={() => handleDeleteUser(user.id)}
				/>
			</div>
		));
	};


	return (
		<div className="users">
			{/* Форма добавления нового пользователя */}
			<div className="users-new">
				<form className="users-new__form" onSubmit={handleAddUser}>
					<div className="users-new__inputs">
						<h2 className="users-new__title">Добавление нового пользователя:</h2>

						<div className="user-new__input-box">
							<label htmlFor="email" className="user-new__label">Email пользователя</label>
							<input
								className="user-new__input"
								value={emailNewUser}
								onChange={(e) => setEmailNewUser(e.target.value)}
								maxLength={25}
								id="email"
								name="email"
								type="email"
								placeholder="Введите email"
								required
							/>
						</div>
						<div className="user-new__input-box">
							<label htmlFor="password" className="user-new__label">Пароль пользователя</label>
							<input
								className="user-new__input inputLike"
								value={passwordNewUser}
								onChange={(e) => setPasswordNewUser(e.target.value)}
								maxLength={25}
								id="password"
								name="password"
								type="text"
								placeholder="Введите пароль"
								required
							/>
						</div>
					</div>
					<div className="users-new__buttons">
						<RoleSelector role={role} saveRole={setRole} />

						<button
							className="users-new__add center"
							type="submit"
							disabled={!emailNewUser.trim() || !passwordNewUser.trim() || !role}
						>
							Добавить
						</button>
					</div>
				</form>
			</div>

			{/* Список пользователей */}
			<div className="users-block center">
				<SearchComponent searchItem={searchItem} handleSearch={handleSearch} />

				<div className="users-list">
					{filteredUsersList.length !== 0 ? (
						<UsersList />
					) : (
						<NothingNot />
					)}
				</div>
			</div>
		</div>
	);
};

export default ControlUsers;
