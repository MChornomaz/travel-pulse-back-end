const express = require('express');

const infoController = require('../controllers/info-controllers');

const router = express.Router();
router.get('/info', infoController.getAllInfos);

module.exports = router;
