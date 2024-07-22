const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// get all categories 

router.get('/', (req, res) => {
    pool.query('SELECT * FROM category', (err, rows) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(rows);
    });
});

module.exports = router;