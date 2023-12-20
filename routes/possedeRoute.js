const express = require('express');
const router = express.Router();
const possedeController = require('../controllers/possedeController');

router.get('/possedes', possedeController.getAllPossede);

module.exports = router;
