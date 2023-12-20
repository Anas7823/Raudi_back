const express = require('express');
const router = express.Router();
const modeleController = require('../controllers/modeleController');

router.get('/modeles', modeleController.getAllModele);

module.exports = router;
