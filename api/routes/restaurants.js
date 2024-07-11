const express = require('express');
const pool = require('../db/connection');
const router = express.Router();

// get all restaurants

router.get('/', (req, res) => {
    pool.query('SELECT * FROM restaurant', (err, rows) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(rows);
    });
});

// add restaurant

router.post('/', (req, res) => {
    const { name, address, telephone } = req.body;
    pool.query('INSERT INTO restaurant (name, address, telephone) VALUES (?, ?, ?)', [name, address, telephone], (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ message: 'Restaurant added successfully', restaurant: { id: result.insertId, name, address, telephone } });
    });
});

// delete restaurant

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM restaurant WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    });
});

module.exports = router;