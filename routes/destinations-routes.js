const express = require('express');
const destinationControllers = require('../controllers/destinations-controllers');

const router = express.Router();

router.get('/destinations', destinationControllers.getAllDestinations);

module.exports = router;
