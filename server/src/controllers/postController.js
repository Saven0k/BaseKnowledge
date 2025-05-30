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


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

exports.getImage = async (req, res) => {
    const filepath = path.join(__dirname, '../db/services', req.body.filename);
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send('Файл не найден');
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await getPostById(id);
        res.json({ post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostsByContextByRoleByStatus = async (req, res) => {
    const { role, status, role_context } = req.body;
    try {
        const posts = await getPostsByRoleByStatusByContext(role, status, role_context);
        if (posts.length !== 0) {
            console.log("Вернули записи для роль/контекс/статус", role, role_context, status)
        }

        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPostWithImageHandler = async (req, res) => {
    try {
        const { title, content, role, role_context, status } = req.body;
        const image = req.file;
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
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createPostWithImage = [upload.single('file'), createPostWithImageHandler]

exports.updatePost = async (req, res) => {
    const { id, title, content, role, status, role_context } = req.body;
    try {
        const updatedPost = await updatePost(id, title, content, role, status, role_context);
        res.json({ message: "Пост обновлен", post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateStatusPost = async (req, res) => {
    const { id, status } = req.body;
    try {
        const updatedPost = await updatePostStatus(id, status);
        res.json({ message: "Пост обновлен", post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        await deletePost(postId);
        res.json({ message: "Post deleted successfully", status: "ok" });
    } catch (err) {
        console.error("Error deleting post: ", err);
        res.status(500).send("Error deleting post");
    }
};