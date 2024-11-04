const express = require('express');
const router = express.Router();
const { login } = require('../controller/user');

// User routes
router.post('/login', login);

module.exports = router;
