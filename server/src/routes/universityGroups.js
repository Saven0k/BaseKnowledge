// src/routes/users.js
const express = require('express');
const router = express.Router();
const universityGroupsController = require('../controllers/universityGroupController')

router.get('/', universityGroupsController.getUniversityGroups);
router.post('/new', universityGroupsController.addUniversityGroup);
router.put('/update', universityGroupsController.updateUniversityGroup);
router.delete('/delete/:id', universityGroupsController.deleteUniversityGroup);


module.exports = router;