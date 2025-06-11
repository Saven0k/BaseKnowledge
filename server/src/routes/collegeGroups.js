// src/routes/users.js
const express = require('express');
const router = express.Router();
const collegeGroupController = require('../controllers/collegeGroupController')

router.get('/', collegeGroupController.getCollegeGroups);
router.post('/new', collegeGroupController.addCollegeGroup);
router.put('/update', collegeGroupController.updateCollegeGroup);
router.delete('/delete/:id', collegeGroupController.deleteCollegeGroup);


module.exports = router;