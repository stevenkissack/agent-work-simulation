'use strict';

const express = require('express');
const router = express.Router();

// GET /api/rollup
router.get('/', function (req, res) {
  res.status(501).json({ error: 'Not implemented' });
});

module.exports = router;
