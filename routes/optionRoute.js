const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.get('/options', optionController.getAllOption);

module.exports = router;
