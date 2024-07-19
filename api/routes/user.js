const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// retrieving user from token
router.get('/', (req, res) => {
    const token = req.cookies.token;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(200).json({ user: decoded.user });
    });
})

module.exports = router;