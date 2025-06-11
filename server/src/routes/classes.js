const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController')

router.get('/', classController.getClasses);
router.post('/new', classController.addClass);
router.put('/update', classController.updateClass);
router.delete('/delete/:id', classController.deleteClass);


module.exports = router;