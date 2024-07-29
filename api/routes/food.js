const express = require('express');
const pool = require('../db/connection');
const router = express.Router();

// get all food

router.get('/', (req, res) => {
    pool.query('SELECT * FROM food', (err, rows) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(rows);
    });
});

// get food by id

router.get('/:id', (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM food WHERE id = ?', [id], (err, rows) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (rows.length === 0) {
            res.status(404).json({ error: 'Food not found' });
            return;
        }
        res.json(rows[0]);
    });
}); 

// add food

router.post('/', (req, res) => {
    const { name, price, restaurantId } = req.body;
    pool.query('INSERT INTO food (name, price, restaurantId) VALUES (?, ?, ?)', [name, price, restaurantId], (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ message: 'Restaurant added successfully', restaurant: { id: result.insertId, name, address, telephone } });
    });
});

// edit food

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, restaurantId, categoryId, image, calories, description, ingredients } = req.body;
    pool.query('UPDATE food SET name = ?, price = ?, restaurantId = ?, categoryId = ?, image = ?, calories = ?, description = ?, ingredients = ? WHERE Id = ?', 
        [name, price, restaurantId, categoryId, image, calories, description, ingredients, id], (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Food not found' });
            return;
        }
        res.status(200).json({ message: 'Food updated successfully' });
    });
});

module.exports = router;