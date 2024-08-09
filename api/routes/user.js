const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/jwtProtected');
const pool = require('../db/connection');
const upload = require('../middleware/upload');
const multer = require('multer');
require('dotenv').config();

// retrieving user from token
router.get('/', verifyToken, (req, res) => {
    // token has been verified from the middleware, and userId is stored in req

    const userId = req.userId;

    // finding the user using the id
    pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
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

router.put('/:id', upload.single('image'), (req, res) => {
    const { id } = req.params; 
    const { username, email } = req.body;
    const image = req.file ? req.file.filename : null;

    let query = 'UPDATE users SET username = ?, email = ?';
    let params = [username, email];

    if (image) {
        query = query + ', image = ?';
        params.push(image);
    }

    query = query + ' WHERE id = ?';
    params.push(id);

    pool.query(query, params, (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User updated successfully' });
    })

});

module.exports = router;