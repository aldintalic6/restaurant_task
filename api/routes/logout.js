const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;