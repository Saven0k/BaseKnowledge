const {
    getAllPosts,
    getPostById,
    createPostWithImage,
    updatePost,
    deletePost,
    getPostsByRoleByStatusByContext,
    updatePostStatus,
} = require('../db/services/posts');
const multer = require('multer');
const path = require('path');
const fs = require('fs')

// Настройка multer для загрузки файлов
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

// Получение изображения по имени файла
exports.getImage = async (req, res) => {
    const filepath = path.join(__dirname, '../db/services', req.body.filename);
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send('Файл не найден');
    }
};

// Получение всех постов
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json({ posts });
    } catch (error) {
        console.log("Ошибка при получении постов:", error);
        res.status(500).json({ message: error.message });
    }
};

// Получение поста по ID
exports.getPostById = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await getPostById(id);
        res.json({ post });
    } catch (error) {
        console.log("Ошибка при получении поста:", error);
        res.status(500).json({ message: error.message });
    }
};

// Получение постов по роли, статусу и контексту
exports.getPostsByContextByRoleByStatus = async (req, res) => {
    const { role, status, role_context } = req.body;
    try {
        const posts = await getPostsByRoleByStatusByContext(role, status, role_context);
        if (posts.length !== 0) {
            console.log("Вернули записи для роль/контекст/статус", role, role_context, status)
        }
        res.json({ posts });
    } catch (error) {
        console.log("Ошибка при получении постов по фильтрам:", error);
        res.status(500).json({ message: error.message });
    }
};

// Обработчик создания поста с изображением
const createPostWithImageHandler = async (req, res) => {
    try {
        const { title, content, role, role_context, status } = req.body;
        const image = req.file;

        // Проверка обязательных полей
        if (!title || !content || !role) {
            return res.status(400).json({ error: 'Обязательные поля отсутствуют' });
        }

        const post = await createPostWithImage(
            title,
            content,
            role,
            status,
            role_context,
            image
        );
        res.status(201).json(post);
    } catch (error) {
        console.error('Ошибка при создании поста:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Создание поста с изображением (мультер + обработчик)
exports.createPostWithImage = [upload.single('file'), createPostWithImageHandler];

// Обновление поста
exports.updatePost = async (req, res) => {
    const { id, title, content, role, status, role_context } = req.body;
    try {
        // Проверка наличия ID
        if (!id) {
            return res.status(400).json({ message: "ID поста обязателен" });
        }

        const updatedPost = await updatePost(id, title, content, role, status, role_context);
        res.json({ message: "Пост обновлен", post: updatedPost });
    } catch (error) {
        console.log("Ошибка при обновлении поста:", error);
        res.status(500).json({ message: error.message });
    }
};

// Обновление статуса поста
exports.updateStatusPost = async (req, res) => {
    const { id, status } = req.body;
    try {
        // Проверка обязательных полей
        if (!id || !status) {
            return res.status(400).json({ message: "ID и статус обязательны" });
        }

        const updatedPost = await updatePostStatus(id, status);
        res.json({ message: "Статус поста обновлен", post: updatedPost });
    } catch (error) {
        console.log("Ошибка при обновлении статуса поста:", error);
        res.status(500).json({ message: error.message });
    }
};

// Удаление поста
exports.deletePost = async (req, res) => {
    try {
        const { id: postId } = req.params;

        // Проверка наличия ID
        if (!postId) {
            return res.status(400).json({ message: "ID поста обязателен" });
        }

        await deletePost(postId);
        res.json({ message: "Пост успешно удален", status: "ok" });
    } catch (err) {
        console.error("Ошибка при удалении поста: ", err);
        res.status(500).json({ message: "Ошибка при удалении поста" });
    }
};