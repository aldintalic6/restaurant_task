const express = require('express');
const pool = require('../db/connection');
const router = express.Router();
const multer = require('multer');
const upload = require('../middleware/upload');

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
// all data needed to add food, so no need to dynamically build sql query

router.post('/', upload.single('image'), (req, res) => {
    const { name, price, restaurantId, categoryId, calories, description, ingredients } = req.body;
    const image = req.file.filename;

    pool.query('INSERT INTO food (name, price, restaurantId, categoryId, image, calories, description, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, price, restaurantId, categoryId, image, calories, description, ingredients],
        (err, result) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.status(201).json({ message: 'Food added successfully', food: { id: result.insertId } });
        });
});

// edit food

router.put('/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, price, restaurantId, categoryId, calories, description, ingredients } = req.body;
    const image = req.file ? req.file.filename : null;

    let query = 'UPDATE food SET name = ?, price = ?, restaurantId = ?, categoryId = ?, calories = ?, description = ?, ingredients = ?';
    let params = [name, price, restaurantId, categoryId, calories, description, ingredients];

    if (image) {
        query = query + ', image = ?';
        params.push(image);
    }

    query = query + ' WHERE Id = ?';
    params.push(id);

    pool.query(query, params, (err, result) => {
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