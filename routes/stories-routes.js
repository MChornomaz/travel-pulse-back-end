const express = require('express');
const storiesControllers = require('../controllers/stories-controller');

const router = express.Router();

router.get('/stories', storiesControllers.getAllStories);

module.exports = router;
