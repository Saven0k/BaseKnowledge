// src/routes/users.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController')

router.get('/', roleController.getRoles);
router.post('/new', roleController.addRole);
router.put('/update', roleController.updateRole);
router.delete('/delete/:id', roleController.deleteRole);


module.exports = router;