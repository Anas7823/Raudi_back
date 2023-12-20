const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.get('/options', optionController.getAllOption);
router.get('/options/:id', optionController.getOneOption);
router.post('/options/:id', optionController.addOptionToModele);

module.exports = router;
