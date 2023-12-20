const express = require('express');
const router = express.Router();
const modeleController = require('../controllers/modeleController');

router.get('/modeles', modeleController.getAllModele);
router.get('/modeles/:id', modeleController.getOneModele);
router.post('/modeles', modeleController.createModele);

module.exports = router;
