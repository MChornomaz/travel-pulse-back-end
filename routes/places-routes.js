const express = require('express');

const placesController = require('../controllers/places-controllers');

const router = express.Router();
router.get('/places', placesController.getAllPlaces);

module.exports = router;
