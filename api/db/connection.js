const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'restaurant'
});

// Test MySQL connection

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
});

module.exports = pool;