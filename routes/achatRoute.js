const express = require('express');
const router = express.Router();
const achatController = require('../controllers/achatController');

router.get('/achats', achatController.getAllAchat);

module.exports = router;
