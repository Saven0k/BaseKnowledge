const { db, getPublicPostsOfRole, createPostWithImage, addStudentGroup, deleteGroup, UpdateGroup, getCities, addCity, UpdateCity, deleteCity, getRoles, addRole, updateRole, deleteRole } = require("./db"); // Importing the createPost function and the db object
const express = require("express");
const path = require('path');
const app = express();
const fs = require('fs');

const multer = require('multer');

const {
	getStudentGroups,
	getAllPosts,
	getPostById,
	getPostsOfRole,
	getPostsForStudent,
	getPostsForVisible,
	createPost,
	updatePost,
	deletePost,
	getAllUsers,
	getAllTeacherVisits,
	getTeacherVisits,
	updateTeacherVisits,
	createUser,
	updateUser,
	deleteUser,
	findUser,
	addStudentVisitors,
	getCountAllStudentVisitors,
} = require('./db')

// Port used
const PORT = 5000;

/**
 * Middleware for JSON parsing
 */
app.use(express.json());

/**
 * Получить все посты
 * GET /api/posts
 */
app.get("/api/posts", async (req, res) => {
	try {
		const posts = await getAllPosts();
		res.json({ posts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});


/**
 * Получить пост по ID
 * GET /api/posts/:id
 */
app.get("/api/posts/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const post = await getPostById(id);
		res.json({ post });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});


/**
 * Получить посты для определенной роли
 * POST /api/posts/role
 */
app.post("/api/posts/role", async (req, res) => {
	const { role } = req.body;
	try {
		const posts = await getPostsOfRole(role);
		res.json({ posts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Получить публичные посты для роли
 * POST /api/posts/public/role
 */
app.post("/api/posts/public/role", async (req, res) => {
	const { forField } = req.body;
	try {
		const posts = await getPublicPostsOfRole(forField);
		res.json({ posts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Получить посты для группы студентов
 * POST /api/posts/group
 */
app.post("/api/posts/group", async (req, res) => {
	const { group } = req.body;
	try {
		const posts = await getPostsForStudent(group);
		res.json({ posts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Получить видимые посты
 * POST /api/posts/visible
 */
app.post("/api/posts/visible", async (req, res) => {
	const { forField } = req.body;
	try {
		const posts = await getPostsForVisible(forField);
		res.json({ posts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Создать новый пост
 * POST /api/posts/add
 */
app.post("/api/posts/add", async (req, res) => {
	const { name, text, forField, visible, group } = req.body;
	try {
		const result = await createPost(name, text, forField, visible, group);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});


// Настройка multer для обработки multipart/form-data
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
});



/**
 * Создать пост с изображением
 * POST /api/posts/addWithImage
 */
app.post("/api/posts/addWithImage", upload.single('image'), async (req, res) => {
	try {
		const { title, content, typeVisible, group, publicPost } = req.body;
		const imagePath = req.file ? req.file.path : null;

		const post = await createPostWithImage({
			title,
			content,
			typeVisible,
			group,
			publicPost,
			image_path: imagePath ? path.relative(__dirname, imagePath) : null
		});

		res.status(201).json(post);
	} catch (error) {
		console.error('Error creating post:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

/**
 * Update post, api
 */
// app.put("/api/posts/update/:id", async (req, res) => {
// 	const { id, name, text, forField, visible, group } = req.body;
// 	try {
// 		await updatePost(id, name, text, forField, visible, group);
// 		res.json({ message: "Пост обновлен" });
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// });

/**
 * Обновить пост
 * PUT /api/posts/update/:id
 */
app.put("/api/posts/update/:id", async (req, res) => {
	const { id, name, text, forField, visible, group } = req.body;
	try {
		const updatedPost = await updatePost(id, name, text, forField, visible, group);
		res.json({ message: "Пост обновлен", post: updatedPost });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Удалить пост
 * DELETE /api/posts/delete/:id
 */
app.delete("/api/posts/delete/:id", async (req, res) => {
	try {
		const { id: postId } = req.params;
		await deletePost(postId);
		res.json({ message: "Post deleted successfully", status: "ok" });
	} catch (err) {
		console.error("Error deleting post: ", err);
		res.status(500).send("Error deleting post");
	}
});

// Роуты для работы с пользователями
// ==============================================

/**
 * Получить всех пользователей
 * GET /api/users
 */
app.get("/api/users", async (req, res) => {
	try {
		const users = await getAllUsers();
		res.json({ users });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Получить общее количество посещений преподавателей
 * GET /api/users/visit/all
 */
app.get('/api/users/visit/all', async (req, res) => {
	try {
		const totalVisits = await getAllTeacherVisits();
		res.json(totalVisits);
	} catch (error) {
		console.error('Ошибка:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
});

/**
 * Получить количество посещений конкретного преподавателя
 * POST /api/users/visitors
 */
app.post('/api/users/visitors', async (req, res) => {
	const { email } = req.body;
	try {
		const visitCount = await getTeacherVisits(email);
		res.json(visitCount);
	} catch (error) {
		console.error('Ошибка:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
});

/**
 * Обновить количество посещений преподавателя
 * PUT /api/users/visit/update
 */
app.put('/api/users/visit/update', async (req, res) => {
	const { email, countVisit } = req.body;
	try {
		await updateTeacherVisits(email, countVisit);
		res.json({ message: "Пользователь обновлен" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
/**
 * Создать нового пользователя
 * POST /api/users/new
 */
app.post("/api/users/new", async (req, res) => {
	const { email, password, role } = req.body;
	try {
		const result = await createUser(email, password, role);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Обновить пользователя
 * PUT /api/users/update/:id
 */

app.put("/api/users/update/:id", async (req, res) => {
	const { id, email, password, countVisit, role } = req.body;
	try {
		await updateUser(id, email, password, countVisit, role);
		res.json({ message: "Пользователь обновлен" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Удалить пользователя
 * DELETE /api/users/delete/:id
 */
app.delete("/api/users/delete/:id", async (req, res) => {
	try {
		const { id: userId } = req.params;
		await deleteUser(userId);
		res.json({ message: "User deleted successfully", status: "ok" });
	} catch (err) {
		console.error("Error deleting user: ", err);
		res.status(500).send("Error deleting user");
	}
});

/**
 * Найти пользователя по email и паролю
 * POST /api/users/find
 */
app.post("/api/users/find", async (req, res) => {
	const { email, password } = req.body;
	try {
		const response = await findUser(email, password);
		res.json({ response });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Роуты для работы с посещениями студентов
// ==============================================
/**
 * Получить количество посещений всех студентов
 * GET /api/visitors/all
 */
app.get('/api/visitors/all', async (req, res) => {
	try {
		const data = await getCountAllStudentVisitors();
		res.json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Добавить посещение студента
 * POST /api/visitors/add
 */
app.post('/api/visitors/add', async (req, res) => {
	try {
		data = await addStudentVisitors();
		res.status(200).send('OK');
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
});

// Роуты для работы с группами студентов
// ==============================================

/**
 * Получить все группы студентов
 * GET /api/student/groups
 */
app.get("/api/student/groups", async (req, res) => {
	try {
		const groups = await getStudentGroups();
		res.json({ groups });
	} catch (error) {
		console.log("ошибка");
		res.status(500).json({ message: error.message });
	}
});

/**
 * Создать новую группу студентов
 * POST /api/student/groups/new
 */
app.post("/api/student/groups/new", async (req, res) => {
	const { groupName } = req.body;
	try {
		const response = await addStudentGroup(groupName);
		res.json({ response });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Удалить группу студентов
 * POST /api/student/groups/delete/:id
 */
app.post("/api/student/groups/delete/:id", async (req, res) => {
	try {
		const { id: groupId } = req.params;
		await deleteGroup(groupId);
		res.json({ message: "Group deleted successfully", status: 'ok' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Обновить группу студентов
 * PUT /api/student/groups/update
 */
app.put("/api/student/groups/update", async (req, res) => {
	const { id, name } = req.body;
	try {
		await UpdateGroup(id, name);
		res.json({ message: "Группа обновлена" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
// Роуты для работы с городами
// ==============================================

/**
 * Получить все города
 * GET /api/cities
 */
app.get('/api/cities', async (req, res) => {
	try {
		const cities = await getCities();
		res.json({ cities: cities });
	} catch (error) {
		console.log("ошибка");
		res.status(500).json({ message: error.message });
	}
});

/**
 * Добавить новый город
 * POST /api/cities/new
 */
app.post('/api/cities/new', async (req, res) => {
	const { name } = req.body;
	try {
		const response = await addCity(name);
		res.json({ response });
	} catch (error) {
		console.log("ошибка");
		res.status(500).json({ message: error.message });
	}
});

/**
 * Обновить город
 * PUT /api/cities/update
 */
app.put('/api/cities/update', async (req, res) => {
	const { id, name } = req.body;
	try {
		await UpdateCity(id, name);
		res.json({ message: "Данные о городе изменены" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Удалить город
 * POST /api/cities/delete/:id
 */
app.post("/api/cities/delete/:id", async (req, res) => {
	try {
		const { id: cityId } = req.params;
		await deleteCity(cityId);
		res.json({ message: "City deleted successfully", status: 'ok' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Роуты для работы с ролями
// ==============================================

/**
 * Получить все роли
 * GET /api/roles
 */
app.get('/api/roles', async (req, res) => {
	try {
		const roles = await getRoles();
		res.json({ roles: roles });
	} catch (error) {
		console.log("Ошибка отправки списка ролей");
		res.status(500).json({ message: error.message });
	}
});

/**
 * Добавить новую роль
 * POST /api/roles/new
 */
app.post('/api/roles/new', async (req, res) => {
	const { name } = req.body;
	try {
		const response = await addRole(name);
		res.json({ response });
	} catch (error) {
		console.log("Ошибка добавления новой роли в таблицу");
		res.status(500).json({ message: error.message });
	}
});

/**
 * Обновить роль
 * PUT /api/roles/update
 */
app.put('/api/roles/update', async (req, res) => {
	const { id, name } = req.body;
	try {
		await updateRole(id, name);
		res.json({ message: "Данные о роли изменены" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Удалить роль
 * POST /api/roles/delete/:id
 */
app.post("/api/roles/delete/:id", async (req, res) => {
	try {
		const { id: roleId } = req.params;
		await deleteRole(roleId);
		res.json({ message: "Роль успешно удалена", status: 'ok' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});


// Статическое обслуживание загруженных изображений
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/**
 * Запуск сервера
 */
const server = app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});

/**
 * Обработка SIGINT для корректного завершения работы базы данных
 */
process.on("SIGINT", () => {
	db.close((err) => {
		if (err) {
			console.error("Ошибка при закрытии базы данных:", err.message);
		} else {
			console.log("Соединение с базой данных закрыто.");
		}
		process.exit(0);
	});
});

module.exports = app;