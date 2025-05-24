const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require('fs');



const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Создаем директорию для загрузок, если ее нет
if (!fs.existsSync(UPLOAD_DIR)) {
	fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}


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
			countVisit INTEGER,
			role TEXT
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
			student_groups TEXT,
			public_post TEXT,
			date_created DATE,
			image_path TEXT
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
		db.run(
			`CREATE TABLE IF NOT EXISTS cities (
				id TEXT PRIMARY KEY,
				name TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица cities успешно создана или уже существует."
					);
				}
			}
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS roles (
				id TEXT PRIMARY KEY,
				name TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица roles успешно создана или уже существует."
					);
				}
			}
		);

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
async function createUser(email, password, role) {
	const userId = generateUniqueIdForUser();
	const sql = `INSERT INTO users (id, email, password, countVisit, role) VALUES (?, ?, ?, ?, ?)`;

	return new Promise((resolve, reject) => {
		db.run(sql, [userId, email, password, 0, role ], function (err) {
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
async function updateUser(id, email, password, countVisit, role) {
	const sql = `UPDATE users SET email = ?, password = ?, countVisit = ?, role = ? WHERE id = ?`;

	return new Promise((resolve, reject) => {
		db.run(sql, [email, password, countVisit, role, id], function (err) {
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
/**
 * Получает общее количество посещений всех преподавателей.
 * Использует SUM для агрегации значений из всех записей.
 * COALESCE обеспечивает обработку NULL значений как 0.
 * 
 * @returns {Promise<{totalVisits: number}>} 
 *    Промис с объектом, содержащим общее количество посещений
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса
 * 
 * @example
 * const visits = await getAllTeacherVisits();
 * console.log(`Общее количество посещений: ${visits.totalVisits}`);
 */
async function getAllTeacherVisits() {
    const sql = `SELECT SUM(COALESCE(countVisit, 0)) as totalVisits FROM users`;
    
    return new Promise((resolve, reject) => {
        db.get(sql, function (err, row) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка получения статистики посещений преподавателей"));
            }
            resolve(row);
        });
    });
}
/**
 * Получает количество посещений для конкретного преподавателя по email.
 * 
 * @param {string} email - Электронная почта преподавателя
 * @returns {Promise<{countVisit: number}>} 
 *    Промис с объектом, содержащим количество посещений
 * @throws {Error} Если преподаватель не найден или произошла ошибка запроса
 * 
 * @example
 * const visits = await getTeacherVisits('professor@university.edu');
 * console.log(`Посещения: ${visits.countVisit}`);
 */
async function getTeacherVisits(email) {
    const sql = `SELECT countVisit FROM users WHERE email = ?`;
    
    return new Promise((resolve, reject) => {
        db.get(sql, [email], function (err, row) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error(`Ошибка получения данных преподавателя ${email}`));
            }
            resolve(row);
        });
    });
}
/**
 * Обновляет счетчик посещений для преподавателя.
 * 
 * @param {string} email - Электронная почта преподавателя
 * @param {number} countVisit - Новое значение счетчика посещений
 * @returns {Promise<Object>} Промис с результатом операции
 * @throws {Error} Если обновление не удалось
 * 
 * @example
 * // Увеличить счетчик посещений на 1
 * const current = await getTeacherVisits('professor@university.edu');
 * await updateTeacherVisits('professor@university.edu', current.countVisit + 1);
 */
async function updateTeacherVisits(email, countVisit) {
    const sql = `UPDATE users SET countVisit = ? WHERE email = ?`;
    
    return new Promise((resolve, reject) => {
        db.run(sql, [countVisit, email], function (err) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка обновления счетчика посещений"));
            }
            resolve({ success: true, changes: this.changes });
        });
    });
}




/**
 * Генерирует уникальный идентификатор для поста.
 * Использует временную метку для гарантии уникальности.
 * @returns {string} ID поста в формате "post_<timestamp>"
 */
function generateUniqueIdForPost() {
	return "post_" + Date.now();
}

/**
 * Создает новый пост в базе данных.
 * @param {string} title - Заголовок поста
 * @param {string} content - Содержание поста
 * @param {string} role - Роль, для которой предназначен пост
 * @param {boolean} public_post - Флаг публичности поста
 * @param {Array<string>} student_groups - Массив групп студентов
 * @returns {Promise<Object>} Объект с ID поста и сообщением об успехе
 * @throws {Error} При ошибке записи в базу данных
 */
async function createPost(title, content, role, public_post, student_groups) {
	const userId = generateUniqueIdForPost();
	const sql = `INSERT INTO posts (id, title, content, role, student_groups, public_post, date_created) VALUES (?, ?, ?, ?, ?, ?, ?)`;

	return new Promise((resolve, reject) => {
		const today = new Date();
		const formattedDate = [
			String(today.getDate()).padStart(2, '0'),
			String(today.getMonth() + 1).padStart(2, '0'),
			today.getFullYear()
		].join('.');

		db.run(sql, [userId, title, content, role, JSON.stringify(student_groups), public_post, formattedDate], function (err) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка регистрации поста"));
			}
			resolve({
				userId,
				message: "Запись успешно зарегистрирована",
			});
		});
	});
}

/**
 * Создает пост с прикрепленным изображением.
 * @param {string} title - Заголовок поста
 * @param {string} content - Содержание поста
 * @param {string} role - Роль, для которой предназначен пост
 * @param {boolean} public_post - Флаг публичности поста
 * @param {Array<string>} student_groups - Массив групп студентов
 * @param {Object} image - Объект изображения (multer)
 * @returns {Promise<Object>} Объект с ID поста и сообщением об успехе
 * @throws {Error} При ошибке загрузки изображения или записи в БД
 */
async function createPostWithImage(title, content, role, public_post, student_groups, image) {
	console.log("creating Data with Image");
	console.log(title);
	console.log(content);
	
	console.log(image);
	
	let image_path = null;
	const userId = generateUniqueIdForPost();
	try {
		if (image) {
			console.log("request has image");
			
			const ext = path.extname(image.originalname);
			const filename = `${Date.now()}${ext}`;
			image_path = path.join('uploads', filename);
			console.log(image_path);
			console.log(image);
			console.log(image.buffer);
			
			await fs.promises.writeFile(path.join(__dirname, image_path), image.buffer);
		}

		const sql = `INSERT INTO posts (id, title, content, role, student_groups, public_post, date_created, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

		return new Promise((resolve, reject) => {
			const today = new Date();
			const formattedDate = [
				String(today.getDate()).padStart(2, '0'),
				String(today.getMonth() + 1).padStart(2, '0'),
				today.getFullYear()
			].join('.');

			db.run(sql, [userId, title, content, role, JSON.stringify(student_groups), public_post, formattedDate, image_path], function (err) {
				if (err) {
					console.error("Ошибка базы данных:", err.message);
					return reject(new Error("Ошибка регистрации поста"));
				}
				resolve({
					userId,
					message: "Запись успешно зарегистрирована",
				});
			});
		});
	} catch (error) {
		console.log("some image error");
		
		if (image_path) {
			try {
				await fs.promises.unlink(path.join(__dirname, image_path));
			} catch (unlinkError) {
				console.error('Ошибка удаления изображения:', unlinkError);
			}
		}
		throw error;
	}
}

/**
 * Получает все посты из базы данных.
 * @returns {Promise<Array>} Массив всех постов
 * @throws {Error} При ошибке запроса к базе данных
 */
async function getAllPosts() {
	console.log("getting all posts");
	
	const sql = `SELECT * FROM posts`;
	return new Promise((resolve, reject) => {
		db.all(sql, function (err, rows) {
			if (err) return reject(new Error("Ошибка вывода всех постов"));
			resolve(rows);
		});
	});
}

/**
 * Находит пост по его идентификатору.
 * @param {string} id - ID поста
 * @returns {Promise<Object>} Объект поста
 * @throws {Error} При ошибке запроса или если пост не найден
 */
async function getPostById(id) {
	const sql = `SELECT * FROM posts WHERE id = ?`;
	return new Promise((resolve, reject) => {
		db.all(sql, [id], function (err, rows) {
			if (err) return reject(new Error("Ошибка вывода поста"));
			resolve(rows[0] || null);
		});
	});
}

/**
 * Получает публичные посты для определенной роли.
 * @param {string} role - Роль пользователя
 * @returns {Promise<Array>} Массив публичных постов
 * @throws {Error} При ошибке запроса к базе данных
 */
async function getPublicPostsOfRole(role) {
	const sql = `SELECT * FROM posts WHERE role = ? AND public_post = ?`;
	return new Promise((resolve, reject) => {
		db.all(sql, [role, "1"], function (err, rows) {
			if (err) return reject(new Error("Ошибка вывода публичных постов"));
			resolve(rows);
		});
	});
}

/**
 * Получает все посты для определенной роли.
 * @param {string} role - Роль пользователя
 * @returns {Promise<Array>} Массив постов
 * @throws {Error} При ошибке запроса к базе данных
 */
async function getPostsOfRole(role) {
	const sql = `SELECT * FROM posts WHERE role = ?`;
	return new Promise((resolve, reject) => {
		db.all(sql, [role], function (err, rows) {
			if (err) return reject(new Error("Ошибка вывода постов роли"));
			resolve(rows);
		});
	});
}

/**
 * Получает посты, доступные для студентов указанной группы.
 * Фильтрует публичные студенческие посты, проверяя принадлежность к группе.
 * 
 * @param {string} groupToFind - Идентификатор группы студентов для фильтрации
 * @returns {Promise<Array<Object>>} Промис с массивом подходящих постов
 * @throws {Error} Если произошла ошибка при выполнении запроса к БД
 * 
 * @example
 * // Получить посты для группы "CS-101"
 * const posts = await getPostsForStudent("CS-101");
 */
async function getPublicPostsForStudentByGroup(groupToFind) {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM posts WHERE role = ? AND public_post = ?", 
            ['student', '1'], 
            (err, rows) => {
                if (err) {
                    console.error("Ошибка базы данных:", err.message);
                    return reject(new Error("Ошибка получения студенческих постов"));
                }

                const matchingPosts = rows.filter(post => {
                    try {
                        if (!post.student_groups) return false;
                        const groups = JSON.parse(post.student_groups);
                        return groups.includes(groupToFind);
                    } catch (e) {
                        console.error(`Ошибка обработки групп для поста ${post.id}:`, e);
                        return false;
                    }
                });
                
                resolve(matchingPosts);
            }
        );
    });
}
async function getAllPostsForStudentByGroup(groupToFind) {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM posts WHERE role = ?", 
            ['student', '1'], 
            (err, rows) => {
                if (err) {
                    console.error("Ошибка базы данных:", err.message);
                    return reject(new Error("Ошибка получения студенческих постов"));
                }

                const matchingPosts = rows.filter(post => {
                    try {
                        if (!post.student_groups) return false;
                        const groups = JSON.parse(post.student_groups);
                        return groups.includes(groupToFind);
                    } catch (e) {
                        console.error(`Ошибка обработки групп для поста ${post.id}:`, e);
                        return false;
                    }
                });
                
                resolve(matchingPosts);
            }
        );
    });
}

/**
 * Получает все посты, предназначенные для определенной роли.
 * Включает как публичные, так и приватные посты для указанной роли.
 * 
 * @param {string} role - Роль пользователя (например: 'student', 'teacher')
 * @returns {Promise<Array<Object>>} Промис с массивом постов для указанной роли
 * @throws {Error} Если произошла ошибка при выполнении запроса к БД
 * 
 * @example
 * // Получить все посты для преподавателей
 * const teacherPosts = await getPostByRole("teacher");
 */
async function getPostByRole(role) {
    const sql = `SELECT * FROM posts WHERE role = ?`;

    return new Promise((resolve, reject) => {
        db.all(sql, [role], function (err, rows) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка получения постов по роли"));
            }
            resolve(rows);
        });
    });
}

/**
 * Обновляет существующий пост.
 * @param {string} id - ID поста
 * @param {string} title - Новый заголовок
 * @param {string} content - Новое содержание
 * @param {string} role - Новая роль
 * @param {boolean} public_post - Новый флаг публичности
 * @param {Array<string>} student_groups - Новый массив групп
 * @returns {Promise<Object>} Обновленный объект поста
 * @throws {Error} При ошибке обновления или если пост не найден
 */
async function updatePost(id, title, content, role, public_post, student_groups) {
	const updateSql = `UPDATE posts SET title = ?, content = ?, role = ?, student_groups = ?, public_post = ?, date_created = ? WHERE id = ?`;
	const today = new Date();
	const formattedDate = [
		String(today.getDate()).padStart(2, '0'),
		String(today.getMonth() + 1).padStart(2, '0'),
		today.getFullYear()
	].join('.');

	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(updateSql, [title, content, role, JSON.stringify(student_groups), public_post, formattedDate, id], function (err) {
				if (err) return reject(new Error("Ошибка обновления поста"));

				db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, row) => {
					if (err) return reject(new Error("Ошибка получения обновленного поста"));
					if (!row) return reject(new Error("Пост не найден"));
					resolve(row);
				});
			});
		});
	});
}

/**
 * Удаляет пост по его идентификатору.
 * @param {string} id - ID поста для удаления
 * @returns {Promise<string>} Сообщение об успешном удалении
 * @throws {Error} При ошибке удаления
 */
async function deletePost(id) {
	const sql = "DELETE FROM posts WHERE id = ?";
	return new Promise((resolve, reject) => {
		db.run(sql, [id], (err) => {
			if (err) return reject(new Error(`Ошибка удаления поста с id: ${id}`));
			resolve("OK");
		});
	});
}



/**
 * Генерирует уникальный идентификатор для посетителя.
 * Использует текущую метку времени для гарантии уникальности.
 * 
 * @returns {string} Уникальный ID в формате "visitor_<timestamp>"
 * 
 * @example
 * const visitorId = generateUniqueIdForVisitor();
 * // visitor_1620000000000
 */
function generateUniqueIdForVisitor() {
	return "visitor_" + Date.now();
}

/**
 * Получает общее количество посещений студентов из базы данных.
 * Использует COUNT(*) для оптимизированного подсчета записей.
 * 
 * @returns {Promise<number>} Промис с количеством посещений
 * @throws {Error} В случае ошибки SQL-запроса
 * 
 * @example
 * const visitsCount = await getAllStudentVisits();
 * console.log(`Всего посещений: ${visitsCount}`);
 */
async function getAllStudentVisits() {
	const sql = `SELECT COUNT(*) as count FROM visitors`;

	return new Promise((resolve, reject) => {
		db.get(sql, function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех пользователей"));
			}
			resolve(rows.count);
		});
	});
}

/**
 * Добавляет новую запись о посещении студента.
 * Автоматически генерирует ID и устанавливает текущую дату.
 * 
 * @returns {Promise<Object>} Промис с объектом содержащим visitorId
 * @throws {Error} При ошибке вставки записи
 * 
 * @example
 * const { visitorId } = await addStudentVisitor();
 * console.log(`Добавлено посещение с ID: ${visitorId}`);
 */
async function addStudentVisitor() {
	const visitorId = generateUniqueIdForVisitor();
	const sql = `INSERT INTO visitors (id, date_visit) VALUES (?, ?)`;

	// Форматирование даты в формате DD.MM.YYYY
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





/**
 * Асинхронно получает список всех студенческих групп из базы данных.
 * @returns {Promise<Array>} Промис, который разрешается массивом объектов групп
 * @throws {Error} Если произошла ошибка при выполнении запроса к базе данных
 */
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

/**
 * Генерирует уникальный идентификатор для студенческой группы.
 * @returns {string} Уникальный ID группы в формате "group_<timestamp>"
 */
function generateUniqueIdForGroup() {
	return "group_" + Date.now();
}

/**
 * Добавляет новую студенческую группу в базу данных.
 * @param {string} groupName - Название группы для добавления
 * @returns {Promise<Object>} Промис, который разрешается объектом с ID созданной группы {groupId: string}
 * @throws {Error} Если произошла ошибка при добавлении группы
 */
async function addStudentGroup(groupName) {
	const groupId = generateUniqueIdForGroup();
	const sql = 'INSERT INTO groups (id, name) VALUES ( ?, ? )'
	return new Promise((resolve, reject) => {
		db.run(sql, [groupId, groupName], function (err) {
			if (err) {
				console.error('Ошибка базы данных:', err.message);
				return reject(new Error('Ошибка добавления группы'));
			}
			console.log("Group added with", groupName);
			resolve({
				groupId,
			})
		})
	})
}

/**
 * Обновляет информацию о студенческой группе в базе данных.
 * @param {string} id - ID группы для обновления
 * @param {string} groupName - Новое название группы
 * @returns {Promise<Object>} Промис, который разрешается обновленным объектом группы
 * @throws {Error} Если произошла ошибка при обновлении или группа не найдена
 */
async function UpdateGroup(id, groupName) {
	const updateSql = `UPDATE groups SET name = ? WHERE id = ?`;

	// Обновляем пост и затем получаем обновленные данные
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			// Выполняем обновление
			db.run(updateSql, [groupName, id], function (err) {
				if (err) {
					console.error("Ошибка базы данных при обновлении:", err.message);
					return reject(new Error("Ошибка обновления группы"));
				}

				// После успешного обновления получаем обновленный пост
				db.get(`SELECT * FROM groups WHERE id = ?`, [id], (err, row) => {
					if (err) {
						console.error("Ошибка базы данных при получении обновленной группы:", err.message);
						return reject(new Error("Ошибка при получении обновленной группы"));
					}
					if (!row) {
						return reject(new Error("Группа не найдена после обновления"));
					}
					console.log("Группа обновлена и возвращена");
					resolve(row);
				});
			});
		});
	});
}

/**
 * Удаляет студенческую группу из базы данных по указанному ID.
 * @param {string} id - ID группы для удаления
 * @returns {Promise<string>} Промис, который разрешается строкой "OK" при успешном удалении
 * @throws {Error} Если произошла ошибка при удалении группы
 */
async function deleteGroup(id) {
	const sql = "DELETE FROM groups WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.run(sql, [id], (err) => {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				reject(new Error("Ошибка удаление группы с id: ", id));
			} else {
				console.log(`Группа с id ${id} удалена`);
				resolve("OK");
			}
		});
	});
}



/**
 * Генерирует уникальный идентификатор для города.
 * @returns {string} Уникальный ID города в формате "city_<timestamp>"
 */
function generateUniqueIdForRole() {
	return "city_" + Date.now();
}


/**
 * Асинхронно получает список всех городов из базы данных.
 * @returns {Promise<Array>} Промис, который разрешается массивом объектов городов
 * @throws {Error} Если произошла ошибка при выполнении запроса к базе данных
 */
async function getCities() {
	const sql = `SELECT * FROM cities`;

	return new Promise((resolve, reject) => {
		db.all(sql, function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех городов"));
			}
			resolve(rows);
		});
	});
}


/**
 * Добавляет новый город в базу данных.
 * @param {string} cityName - Название города для добавления
 * @returns {Promise<Object>} Промис, который разрешается объектом с ID созданного города {cityId: string}
 * @throws {Error} Если произошла ошибка при добавлении города
 */
async function addCity(cityName) {
	const cityId = generateUniqueIdForRole();
	const sql = 'INSERT INTO cities (id, name) VALUES ( ?, ? )'
	return new Promise((resolve, reject) => {
		db.run(sql, [cityId, cityName], function (err) {
			if (err) {
				console.error('Ошибка базы данных:', err.message);
				return reject(new Error('Ошибка добавления города'));
			}
			console.log("City added");
			resolve({
				cityId,
			})
		})
	})
}

/**
 * Обновляет информацию о городе в базе данных.
 * @param {string} id - ID города для обновления
 * @param {string} cityName - Новое название города
 * @returns {Promise<Object>} Промис, который разрешается обновленным объектом города
 * @throws {Error} Если произошла ошибка при обновлении или город не найден
 */
async function updateCity(id, cityName) {
	const updateSql = `UPDATE cities SET name = ? WHERE id = ?`;

	// Обновляем пост и затем получаем обновленные данные
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			// Выполняем обновление
			db.run(updateSql, [cityName, id], function (err) {
				if (err) {
					console.error("Ошибка базы данных при обновлении:", err.message);
					return reject(new Error("Ошибка обновления города"));
				}

				// После успешного обновления получаем обновленный пост
				db.get(`SELECT * FROM cities WHERE id = ?`, [id], (err, row) => {
					if (err) {
						console.error("Ошибка базы данных при получении обновленного города:", err.message);
						return reject(new Error("Ошибка при получении обновленного города"));
					}
					if (!row) {
						return reject(new Error("Город не найден после обновления"));
					}
					console.log("Город обновлен и возвращен");
					resolve(row);
				});
			});
		});
	});
}

/**
 * Удаляет город из базы данных по указанному ID.
 * @param {string} id - ID города для удаления
 * @returns {Promise<string>} Промис, который разрешается строкой "OK" при успешном удалении
 * @throws {Error} Если произошла ошибка при удалении города
 */
async function deleteCity(id) {
	const sql = "DELETE FROM cities WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.run(sql, [id], (err) => {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				reject(new Error("Ошибка удаление города с id: ", id));
			} else {
				console.log(`Город с id ${id} удален`);
				resolve("OK");
			}
		});
	});
}



/**
 * Генерирует уникальный идентификатор для новой роли.
 * @returns {string} Уникальный ID роли в формате "role_<timestamp>"
 */
function generateUniqueIdForRole() {
	return "role_" + Date.now();
}

/**
 * Асинхронно получает все роли из базы данных.
 * @returns {Promise<Array>} Промис, который разрешается массивом объектов ролей
 * @throws {Error} Если произошла ошибка при запросе к базе данных
 */
async function getRoles() {
	const sql = `SELECT * FROM roles`;

	return new Promise((resolve, reject) => {
		db.all(sql, function (err, rows) {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				return reject(new Error("Ошибка вывода всех ролей"));
			}
			resolve(rows);
		});
	});
}



/**
 * Добавляет новую роль в базу данных.
 * @param {string} role - Название новой роли
 * @returns {Promise<Object>} Промис, который разрешается объектом с ID созданной роли
 * @throws {Error} Если произошла ошибка при добавлении роли
 */
async function addRole(role) {
	const roleId = generateUniqueIdForRole();
	const sql = 'INSERT INTO roles (id, name) VALUES ( ?, ? )'
	return new Promise((resolve, reject) => {
		db.run(sql, [roleId, role], function (err) {
			if (err) {
				console.error('Ошибка базы данных:', err.message);
				return reject(new Error('Ошибка добавления роли'));
			}
			console.log("Role added");
			resolve({
				roleId: roleId,
			})
		})
	})
}

/**
 * Обновляет существующую роль в базе данных.
 * @param {string} id - ID роли для обновления
 * @param {string} role - Новое название роли
 * @returns {Promise<Object>} Промис, который разрешается обновленным объектом роли
 * @throws {Error} Если произошла ошибка при обновлении или роль не найдена
 */
async function updateRole(id, role) {
	const updateSql = `UPDATE roles SET name = ? WHERE id = ?`;

	// Обновляем пост и затем получаем обновленные данные
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			// Выполняем обновление
			db.run(updateSql, [role, id], function (err) {
				if (err) {
					console.error("Ошибка базы данных при обновлении:", err.message);
					return reject(new Error("Ошибка обновления роли"));
				}

				// После успешного обновления получаем обновленный пост
				db.get(`SELECT * FROM roles WHERE id = ?`, [id], (err, row) => {
					if (err) {
						console.error("Ошибка базы данных при получении обновленной роли:", err.message);
						return reject(new Error("Ошибка при получении обновленной роли"));
					}
					if (!row) {
						return reject(new Error("Роль не найдена после обновления"));
					}
					console.log("Роль обновлена и возвращена");
					resolve(row);
				});
			});
		});
	});
}

/**
 * Удаляет роль из базы данных по указанному ID.
 * @param {string} id - ID роли для удаления
 * @returns {Promise<string>} Промис, который разрешается строкой "OK" при успешном удалении
 * @throws {Error} Если произошла ошибка при удалении роли
 */
async function deleteRole(id) {
	const sql = "DELETE FROM roles WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.run(sql, [id], (err) => {
			if (err) {
				console.error("Ошибка базы данных:", err.message);
				reject(new Error("Ошибка удаление роли с id: ", id));
			} else {
				console.log(`РОль с id ${id} удалена`);
				resolve("OK");
			}
		});
	});
}


module.exports = {
	getAllPostsForStudentByGroup,
	addRole,
	updateRole,
	deleteRole,
	getRoles,
	addCity,
	deleteCity,
	getCities,
	UpdateCity: updateCity,
	updateUser,
	deleteUser,
	findUser,
	addStudentGroup,
	getAllUsers,
	createUser,
	UpdateGroup,
	generateUniqueIdForUser,
	getAllTeacherVisits,
	deleteGroup,
	updateTeacherVisits,
	getTeacherVisits,
	db,
	getCountAllStudentVisitors: getAllStudentVisits,
	addStudentVisitors: addStudentVisitor,
	generateUniqueIdForPost,
	createPost,
	getAllPosts,
	getPostById,
	getPostsOfRole,
	getPublicPostsForStudentByGroup,
	getPostsForVisible: getPostByRole,
	updatePost,
	deletePost,
	getStudentGroups,
	getPublicPostsOfRole,
	createPostWithImage,
};