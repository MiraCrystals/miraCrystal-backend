// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controller/contactController');

// POST /api/contact
router.post('/', submitContact);

// GET /api/contact (optional, admin view)
router.get('/', getContacts);

module.exports = router;
