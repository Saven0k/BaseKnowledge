const { db, getPublicPostsOfRole, createPostWithImage } = require("./db"); // Importing the createPost function and the db object
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
 * Get posts, api
 */
app.get("/api/posts", async (req, res) => {
	try {
		const posts = await getAllPosts();
		res.json({ posts }); // Отправляем список постов в формате JSON
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.get("/api/posts/:id", async (req, res) => {
	const id = req.params.id
	try {
		const post = await getPostById(id);
		res.json({ post }); // Отправляем список постов в формате JSON
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get posts FOR `item`, api
 */
app.post("/api/posts/for", async (req, res) => {
	const { forField } = req.body;
	try {
		const posts = await getPostsOfRole(forField);
		res.json({ posts }); // Отправляем список постов в формате JSON
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get posts FOR `item`, api
 */
app.post("/api/posts/public/role", async (req, res) => {
	const { forField } = req.body;
	try {
		const posts = await getPublicPostsOfRole(forField);
		res.json({ posts }); // Отправляем список постов в формате JSON
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get posts FOR `item`, api
 */
app.post("/api/posts/group", async (req, res) => {
	const { group } = req.body;
	try {
		const posts = await getPostsForStudent(group);
		res.json({ posts }); // Отправляем список постов в формате JSON
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get posts FOR `item`, api
 */
app.post("/api/posts/visible", async (req, res) => {
	const { forField } = req.body;
	try {
		const posts = await getPostsForVisible(forField);
		res.json({ posts }); // Отправляем список постов в формате JSON
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Add post, api
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
 * Add post, api
 */
app.post("/api/posts/addWithImage", upload.single('image'), async (req, res) => {
	console.log(req.file)
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
 * Remove post,  api
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




/**
 * Get users, api
 */
app.get("/api/users", async (req, res) => {
	try {
		const users = await getAllUsers();
		res.json({ users }); // Отправляем список пользователей в формате JSON
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

	

app.get('/api/teacher/visit/all', async (req, res) => {
	try {
		const totalVisits = await getAllTeacherVisits();
		res.json(totalVisits);
	} catch (error) {
		console.error('Ошибка:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
});

app.post('/api/teacher/visitors', async (req, res) => {
	const { email } = req.body;
	try {
		const visitCount = await getTeacherVisits(email);
		res.json(visitCount);
	} catch (error) {
		console.error('Ошибка:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
});

app.put('/api/teacher/visit/update', async (req, res) => {
	const { email, countVisit } = req.body;
	try {
		await updateTeacherVisits(email, countVisit);
		res.json({ message: "Пользователь обновлен" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Add user, api
 */
app.post("/api/users/add", async (req, res) => {
	const { email, password } = req.body;
	try {
		const result = await createUser(email, password);
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Update post, api
 */
app.put("/api/users/update/:id", async (req, res) => {
	const { id, email, password } = req.body;
	try {
		await updateUser(id, email, password);
		res.json({ message: "Пользователь обновлен" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Remove user,  api
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
 * Find user by email, password, api
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


app.get('/api/visitors/all', async (req, res) => {
	try {
		const data = await getCountAllStudentVisitors();
		res.json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

app.post('/api/visitors/add', async (req, res) => {
	try {
		data = await addStudentVisitors();
		res.status(200).send('OK');
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
app.get("/api/student/groups", async (req, res) => {
	try {
		const groups = await getStudentGroups();
		res.json({ groups });
	} catch (error) {
		console.log("ошибка");
		res.status(500).json({ message: error.message });
	}
});


// Для обслуживания загруженных изображений
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
/**
 * Port listener
 */
const server = app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});

/**
 * Handling SIGINT to shut down the database gracefully
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
