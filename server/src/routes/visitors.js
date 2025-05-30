// src/routes/users.js
const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController')

router.get('/all', visitorController.getAllStudentVisits);
router.post('/add', visitorController.addStudentVisitor);


module.exports = router;