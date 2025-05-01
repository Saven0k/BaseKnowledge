const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database path
const dbPath = path.join(__dirname, "db", "posts.db");

/**
 * Initializing the Database
 */
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Ошибка при открытии базы данных:", err.message);
	} else {
		console.log("Подключение к базе данных успешно установлено.");
		db.run(
			`CREATE TABLE IF NOT EXISTS users (
            id TEXT AUTO_INCREMENT PRIMARY KEY,
            email TEXT,
            password TEXT,
			countVisit INTEGER
        )`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица users успешно создана или уже существует."
					);
				}
			}
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS posts (
			id TEXT AUTO_INCREMENT PRIMARY KEY,
			title TEXT,
			content TEXT,
			role TEXT,
			student_group TEXT,
			public_post TEXT,
			date_created DATE
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица posts успешно создана или уже существует."
					);
				}
			}
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS groups (
				id TEXT PRIMARY KEY,
				name TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица groups успешно создана или уже существует."
					);
				}
			}
		);
		db.run(`
			CREATE TABLE IF NOT EXISTS photos (
			  id INTEGER PRIMARY KEY AUTOINCREMENT,
			  imagePath TEXT NOT NULL,
			  uploadDate TEXT DEFAULT (datetime('now'))
			)
		  `, (err) => {
			if (err) {
				console.error("Ошибка при создании таблицы:", err.message);
			} else {
				console.log(
					"Таблица photos успешно создана или уже существует."
				);
			}
		});
		db.run(
			`CREATE TABLE IF NOT EXISTS visitors (
		    id TEXT AUTO_INCREMENT PRIMARY KEY,
			date_visit TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица visitors успешно создана или уже существует."
					);
				}
			}
		);
	}
});
/**
 * Function to create id for user
 * @returns {string} ID
 */
function generateUniqueIdForUser() {
	return "user_" + Date.now();
}
/**
 * Function for creating a user
 * @param {string} name
 * @param {string} text
 * @returns Returns a promise that resolves to true if the post was successfully updated, or false if the update failed.
 */
async function createUser(email, password) {
	const userId = generateUniqueIdForUser();
	const sql = `INSERT INTO users (id, email, password, countVisit) VALUES (?, ?, ?, ?)`;

	return new Promise((resolve, reject) => {
		db.run(sql, [userId, email, password, 0], function (err) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка регистрации пользователя"));
			}

			console.log(`Пользователь добавлен: ${userId}, ${email}`);
			resolve({
				userId,
				message: "Пользователь успешно зарегистрирован",
			});
		});
	});
}
/**
 * // Function to display data from a table
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
async function getAllUsers() {
	const sql = `SELECT * FROM users`;

	return new Promise((resolve, reject) => {
		db.all(sql, function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех пользователей"));
			}
			console.log("Пользователи выведены");
			resolve(rows);
		});
	});
}
/**
 * Function to update user
 * @param {string} id
 * @param {string} email
 * @param {string} password
 * @returns Returns a promise that resolves to true if the post was successfully updated, or false if the update failed.
 */
async function updateUser(id, email, password) {
	const sql = `UPDATE users SET email = ?, password = ?, countVisit = ? WHERE id = ?`;

	return new Promise((resolve, reject) => {
		db.run(sql, [email, password, 0, id], function (err) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка обновления пользователя"));
			}
			console.log("Пользователь обновлен");
			resolve("OK");
		});
	});
}
/**
 * Deletes a user from the database.
 * @param {string} id
 * @returns bool: True if the user was successfully deleted, False otherwise.
 */
async function deleteUser(id) {
	const sql = "DELETE FROM users WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.run(sql, [id], (err) => {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				reject(new Error("Ошибка удаление пользователя с id: ", id));
			} else {
				console.log(`Пользователь с id ${id} удален`);
				resolve("OK");
			}
		});
	});
}
/**
 * Find a user from the database.
 * @param {string} email
 * @param {string} password
 * @returns bool: True if the user was finded/ false.
 */
async function findUser(email, password) {
	const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

	return new Promise((resolve, reject) => {
		db.get(sql, [email, password], (err, rows) => {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				reject(false);
			} else {
				console.log(`Пользователь был найден\n`);
				resolve(rows);
			}
		});
	});
}
async function getAllTeacherVisits() {
	const sql = `SELECT SUM(COALESCE(countVisit, 0)) as totalVisits FROM users`;
	return new Promise((resolve, reject) => {
		db.get(sql, function (err, row) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка получения просмотров преподавателей"));
			}
			resolve(row);
		});
	});
}
async function getTeacherVisits(email) {
	const sql = `SELECT countVisit FROM users WHERE email = ?`;
	return new Promise((resolve, reject) => {
		db.get(sql, [email], function (err, row) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка получения просмотров преподавателя с id  =  ", id));
			}
			resolve(row);
		});
	});
}
async function updateTeacherVisits(email, countVisit) {
	const sql = `UPDATE users SET countVisit = ? WHERE email = ?`;
	return new Promise((resolve, reject) => {
		db.get(sql, [countVisit, email], function (err, row) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка увеличения колличества посещений"));
			}
			resolve(row);
		});
	});
}
/**
 * Function to create id for post
 * @returns {string} ID
 */
function generateUniqueIdForPost() {
    return "post_" + Date.now();
}
/**
 * Function for creating a post
 * @param {string} name
 * @param {string} text
 * @returns Returns a promise that resolves to true if the post was successfully updated, or false if the update failed.
 */
async function createPost(title, content, role, public_post, student_group) {
    const userId = generateUniqueIdForPost();
    const sql = `INSERT INTO posts (id, title, content, role, student_group, public_post, date_created) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        const today = new Date();
        const formattedDate = [
            String(today.getDate()).padStart(2, '0'),
            String(today.getMonth() + 1).padStart(2, '0'),
            today.getFullYear()
        ].join('.');

        db.run(sql, [userId, title, content, role, student_group, public_post, formattedDate], function (err) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка регистрации поста"));
            }

            console.log(
                `Запись добавлена: ${userId}, ${title}`
            ); // Добавлено для отладки
            resolve({
                userId,
                message: "Запись успешно зарегистрирована",
            });
        });
    });
}
/**
 * // Function to display data from a table
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
async function getAllPosts() {
	const sql = `SELECT * FROM posts`;

	return new Promise((resolve, reject) => {
		db.all(sql, function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех постов"));
			}
			console.log("Записи выведены");
			resolve(rows);
		});
	});
}
/**
 * // Function to display data from a table
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
async function getPostById(id) {
	const sql = `SELECT * FROM posts WHERE id = ?`;

	return new Promise((resolve, reject) => {
		db.all(sql, [id], function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех постов"));
			}
			console.log("Записи выведены");
			resolve(rows);
		});
	});
}
async function getPostsOfRole(role) {
	const sql = `SELECT * FROM posts WHERE role = ? AND public_post = ?`;

	return new Promise((resolve, reject) => {
		db.all(sql, [role, "1"], function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех постов"));
			}
			console.log("Записи выведены");
			resolve(rows);
		});
	});
}
/**
 * // Function to display data from a table
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
async function getPostsForStudent(student_group) {
	const sql = `SELECT * FROM posts WHERE role = ? AND (student_group = ? OR student_group = ?) AND public_post = ?`;

	return new Promise((resolve, reject) => {
		db.all(sql, ['student', student_group, 'all',  '1'], function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех постов"));
			}
			console.log("Записи выведены");
			resolve(rows);
		});
	});
}
/**
 * // Function to display data from a table
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
async function getPostsForVisible(role) {
	const sql = `SELECT * FROM posts WHERE role = ?`;

	return new Promise((resolve, reject) => {
		db.all(sql, [role], function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех постов"));
			}
			console.log("Записи выведены");
			resolve(rows);
		});
	});
}
async function updatePost(id, title, content, role, public_post, student_group) {
    // Сначала обновляем пост
    const updateSql = `UPDATE posts SET title = ?, content = ?, role = ?, student_group = ?, public_post = ?, date_created = ? WHERE id = ?`;
    const today = new Date();
    const formattedDate = [
        String(today.getDate()).padStart(2, '0'),
        String(today.getMonth() + 1).padStart(2, '0'),
        today.getFullYear()
    ].join('.');

    // Обновляем пост и затем получаем обновленные данные
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Выполняем обновление
            db.run(updateSql, [title, content, role, student_group, public_post, formattedDate, id], function (err) {
                if (err) {
                    console.error("Ошибка базы данных при обновлении:", err.message);
                    return reject(new Error("Ошибка обновления поста"));
                }

                // После успешного обновления получаем обновленный пост
                db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        console.error("Ошибка базы данных при получении обновленного поста:", err.message);
                        return reject(new Error("Ошибка при получении обновленного поста"));
                    }
                    if (!row) {
                        return reject(new Error("Пост не найден после обновления"));
                    }
                    console.log("Пост обновлен и возвращен");
                    resolve(row);
                });
            });
        });
    });
}
/**
 * Deletes a post from the database.
 * @param {string} id
 * @returns bool: True if the post was successfully deleted, False otherwise.
 */
async function deletePost(id) {
	const sql = "DELETE FROM posts WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.run(sql, [id], (err) => {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				reject(new Error("Ошибка удаление поста с id: ", id));
			} else {
				console.log(`Пост с id ${id} удален`);
				resolve("OK");
			}
		});
	});
}
function generateUniqueIdForVisitor() {
    return "visitor_" + Date.now();
}
async function getCountAllStudentVisitors() {
    const sql = `SELECT COUNT(*) as count FROM visitors`;

    return new Promise((resolve, reject) => {
        db.get(sql, function (err, rows) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех пользователей"));
            }
            // console.log("Пользователи выведены");
            resolve(rows.count);
        });
    });
}
async function addStudentVisitors() {
    const visitorId = generateUniqueIdForVisitor();
    const sql = `INSERT INTO visitors (id, date_visit) VALUES (?,  ?)`;

    const today = new Date();
    const formattedDate = [
        String(today.getDate()).padStart(2, '0'),
        String(today.getMonth() + 1).padStart(2, '0'),
        today.getFullYear()
    ].join('.');

    return new Promise((resolve, reject) => {
        db.run(sql, [visitorId, formattedDate], function (err) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка добавления посетителя"));
            }
			console.log("Visitor added")
            resolve({
                visitorId,
            });
        });
    });
}
async function getStudentGroups() {
    const sql = `SELECT * FROM groups`;

    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех постов"));
            }
            resolve(rows);
        });
    });
}
module.exports = {
    updateUser,
    deleteUser,
    findUser,
    getAllUsers,
    createUser,
    generateUniqueIdForUser,
    getAllTeacherVisits,
	updateTeacherVisits,
	getTeacherVisits,
	db,
	getCountAllStudentVisitors,
	addStudentVisitors,
	generateUniqueIdForPost,
    createPost,
    getAllPosts,
    getPostById,
    getPostsOfRole,
    getPostsForStudent,
    getPostsForVisible,
    updatePost,
    deletePost,
	getStudentGroups
};
