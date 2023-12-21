const express = require('express');
const router = express.Router();
const achatController = require('../controllers/achatController');
const middleClient = require('../middlewares/client');
const middleComptable = require('../middlewares/comptable');

router.get('/achats',middleComptable.Comptable, achatController.getAllAchat); // Afficher tous les achats (comptable)
router.post('/acheter/:id_modele',middleClient.Client, achatController.createAchat); // Créer un achat (client)
router.get('/achats/total',middleComptable.Comptable, achatController.getTotalOfMonth); // Afficher le total des achats du mois (comptable)

module.exports = router;
