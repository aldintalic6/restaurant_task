const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ error: 'All credentials are required' });
    }

    pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail], (err, results) => {

        if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).json({ error: 'Database error' });
        }

        // user exists?
        if (results.length < 1) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        // comparing passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {

            if (err) {
                console.error('Error comparing passwords ' + err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            
            // Generate JWT
            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true
            });

            res.status(200).json({ message: 'Login successful', userId: user.id });
        });
    });
});

module.exports = router;