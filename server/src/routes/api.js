// src/routes/api.js
const express = require('express');
const router = express.Router();

// Подключаем дочерние роутеры
const userRouter = require('./users');
const groupRouter = require('./groups');
const rolerRouter = require('./roles');
const citiesRouter = require('./cities');
const postsRouter = require('./posts');
const visitorsRouter = require('./visitors');

router.use('/users', userRouter);
router.use('/posts', postsRouter);
router.use('/roles', rolerRouter);
router.use('/student/groups', groupRouter);
router.use('/cities', citiesRouter);
router.use('/visitors', visitorsRouter);

module.exports = router;