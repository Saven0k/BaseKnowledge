// src/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers);
router.get('/visit/all', userController.getUserVisitAll);
router.post('/visitors', userController.getUserVisits);
router.put('/visitors/update', userController.updateUserVisit);
router.post('/new', userController.addUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.post('/find', userController.findUser);

module.exports = router;