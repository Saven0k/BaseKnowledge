// src/routes/users.js
const express = require('express');
const router = express.Router();
const specialityController = require('../controllers/specialityController')

router.get('/', specialityController.getSpecialities);
router.post('/new', specialityController.addSpeciality);
router.put('/update', specialityController.updateSpeciality);
router.delete('/delete/:id', specialityController.deleteSpeciality);


module.exports = router;