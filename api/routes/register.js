const express = require('express');
const pool = require('../db/connection');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {

        if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).json({ error: 'Database error' });
        }

        // is username taken?
        if (results.length > 0) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // hash pass
        bcrypt.hash(password, 10, (err, hashedPassword) => {

            if (err) {
                console.error('Error hashing password: ' + err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // insert new user into db
            pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error executing query: ' + err.stack);
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
            });
        });
    });
});

module.exports = router;