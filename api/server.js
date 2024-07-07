const express = require('express');
const mysql = require('mysql');
const cors = require('cors');  
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

// MySQL Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10, 
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'lejla123',
    database: 'restaurant'
});

// Test MySQL connection
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
});

app.use(cors());  // Use the cors middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// GET ALL RESTAURANS
app.get('/restaurants', (req, res) => {
    pool.query('SELECT * FROM restaurant', (err, rows) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(rows);
    });
  });

// ADD RESTAURANT
app.post('/restaurants', (req, res) => {
    // Extract restaurant data from request body
    const { name, address, telephone } = req.body;
  
    // Execute SQL query to insert new restaurant into database
    pool.query('INSERT INTO restaurant (name, address, telephone) VALUES (?, ?, ?)', [name, address, telephone], (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.status(201).json({ message: 'Restaurant added successfully', restaurant: { id: result.insertId, name, address, telephone } });
    });
  });

// GET ALL FOOD
app.get('/food', (req, res) => {
    pool.query('SELECT * FROM food', (err, rows) => {
        if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
        }
        res.json(rows);
    });
});

// ADD FOOD
app.post('/food', (req, res) => {
    // Extract restaurant data from request body
    const { name, price, restaurantId } = req.body;

     // Validate incoming data
     if (!name || !price || !restaurantId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
  
    // Execute SQL query to insert new restaurant into database
    pool.query('INSERT INTO food (name, price, restaurantId) VALUES (?, ?, ?)', [name, price, restaurantId], (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      // Respond with a success message or the inserted row
      res.status(201).json({ message: 'Food added successfully', food: { id: result.insertId, name, price, restaurantId } });
    });

    console.log('Received data:', req.body);
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});