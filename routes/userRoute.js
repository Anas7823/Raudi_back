const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/create', userController.createTableUser); // Créer la table user (admin)
router.get('/users', userController.getAllUser); // Afficher tous les users (admin)
router.post('/registre', userController.createUser); // Créer un user (all)
router.post('/login', userController.login);   // Se connecter (all)

module.exports = router;
