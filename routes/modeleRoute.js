const express = require('express');
const router = express.Router();
const modeleController = require('../controllers/modeleController');
const middleAdmin = require('../middlewares/admin');

router.get('/modeles', modeleController.getAllModele);
router.get('/modeles/:id', modeleController.getOneModele);
router.post('/modeles',middleAdmin.Admin, modeleController.createModele);
router.delete('/modeles/:id',middleAdmin.Admin, modeleController.deleteModele);

module.exports = router;
