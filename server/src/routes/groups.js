// src/routes/users.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController')

router.get('/', groupController.getGroups);
router.post('/new', groupController.addGroup);
router.put('/update', groupController.updateGroup);
router.delete('/delete/:id', groupController.deleteGroup);


module.exports = router;