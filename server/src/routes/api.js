// src/routes/api.js
const express = require('express');
const router = express.Router();

// Подключаем дочерние роутеры
const userRouter = require('./users');
const collegeGroupRouter = require('./collegeGroups');
const universityGroupRouter = require('./universityGroups');
const rolerRouter = require('./roles');
const citiesRouter = require('./cities');
const postsRouter = require('./posts');
const visitorsRouter = require('./visitors');
const classRouter = require('./classes');
const specialityRouter = require('./specialities');



router.use('/users', userRouter);
router.use('/classes', classRouter);
router.use('/posts', postsRouter);
router.use('/roles', rolerRouter);
router.use('/college/groups', collegeGroupRouter);
router.use('/university/groups', universityGroupRouter);
router.use('/cities', citiesRouter);
router.use('/visitors', visitorsRouter);
router.use('/specialities', specialityRouter);

module.exports = router;