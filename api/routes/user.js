const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/jwtProtected');
const pool = require('../db/connection');
require('dotenv').config();

// retrieving user from token
router.get('/', verifyToken, (req, res) => {
    // token has been verified from the middleware, and userId is stored in req

    const userId = req.userId;

    // finding the user using the id
    pool.query('SELECT * FROM users WHERE Id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user data: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(results[0]);
    })
});

module.exports = router;