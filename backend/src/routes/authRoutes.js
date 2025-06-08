const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { check } = require('express-validator');
const routerAuth = express.Router();
routerAuth.post('/register', [ /* validation */ ], registerUser);
routerAuth.post('/login', [ /* validation */ ], loginUser);
module.exports = routerAuth; // Eksporty na końcu pliku