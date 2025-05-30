// src/routes/users.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController')

router.get('/', groupController.getStudentGroups);
router.post('/new', groupController.addStudentGroup);
router.put('/update', groupController.updateGroup);
router.delete('/delete/:id', groupController.deleteGroup);


module.exports = router;