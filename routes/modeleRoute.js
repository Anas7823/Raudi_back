const express = require('express');
const router = express.Router();
const modeleController = require('../controllers/modeleController');
const middleAdmin = require('../middlewares/admin');
const middleClient = require('../middlewares/client');

router.get('/modeles', modeleController.getAllModele); // Afficher tous les modeles (all)
router.get('/modeles/:id', modeleController.getOneModele); // Afficher un modele (all)
router.get('/modeles/:id/options',middleClient.Client, modeleController.getModeleWithOption);// Afficher le modele avec ses options (client)
router.post('/modeles',middleAdmin.Admin, modeleController.createModele); // Créer un modele (admin)
router.delete('/modeles/:id',middleAdmin.Admin, modeleController.deleteModele); // Supprimer un modele (admin)
router.put('/modeles/:id',middleAdmin.Admin, modeleController.updateModele); // Modifier un modele (admin)

module.exports = router;
