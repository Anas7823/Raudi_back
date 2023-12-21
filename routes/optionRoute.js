const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');
const middleAdmin = require('../middlewares/admin');
const middleClient = require('../middlewares/client');
const middleComptable = require('../middlewares/comptable');

router.get('/options',middleClient.Client, optionController.getAllOption); // Afficher toutes les options (client)
router.get('/options/:id',middleClient.Client, optionController.getOneOption); // Afficher une option (client)
router.post('/options',middleAdmin.Admin, optionController.createOption); // Créer une option (admin)
router.post('/options/:id_modele', middleAdmin.Admin, optionController.addOptionToModele); // Ajouter une option disponible a un modele (amdin)

// crer une option (admin)
module.exports = router;
