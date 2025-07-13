// routes/quoteRoutes.js
const express = require('express');
const router = express.Router();
const { getQuotes, createQuote } = require('../controller/quoteController');

// GET /api/quotes
router.get('/', getQuotes);

// POST /api/quotes
router.post('/', createQuote);

module.exports = router;
