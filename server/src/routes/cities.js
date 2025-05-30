// src/routes/users.js
const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController')

router.get('/', cityController.getCities);
router.post('/new', cityController.addCity);
router.put('/update', cityController.updateCity);
router.delete('/delete/:id', cityController.deleteCity);


module.exports = router;