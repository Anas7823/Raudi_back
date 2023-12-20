const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/create', userController.createTableUser);
router.get('/users', userController.getAllUser);
router.post('/registre', userController.createUser);
router.post('/login', userController.login);

module.exports = router;
