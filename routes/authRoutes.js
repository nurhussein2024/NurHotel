const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// POST /register: Skapa en ny användare
router.post('/register', registerUser);

// POST /login: Logga in och få en JWT-token
router.post('/login', loginUser);

module.exports = router;
