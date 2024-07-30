const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/jwtProtected');
require('dotenv').config();

// retrieving user from token
router.get('/', verifyToken, (req, res) => {
    // token has been verified

    res.status(200).json({ user: { id: req.userId } });

});

module.exports = router;