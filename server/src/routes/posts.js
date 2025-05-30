// src/routes/users.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')

router.get('/', postController.getAllPosts);
router.post('/new', postController.createPostWithImage);
router.get('/:id', postController.getPostById);
router.post('/status/context', postController.getPostsByContextByRoleByStatus);
router.put('/update/:id', postController.updatePost);
router.patch('/update/status', postController.updateStatusPost);
router.delete('/delete/:id', postController.deletePost);
router.post('/image', postController.getImage);


module.exports = router;