const express = require('express');

const results = require('./results');

const router = express.Router();

router.use('/results', results);

module.exports = router;
