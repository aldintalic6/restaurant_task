const jwt = require('jsonwebtoken');
// Temporarily hardcoded secret key for JWT
const JWT_SECRET = 'asasdadslaknalsfnk3424342kn42kčn423kčn32kč4č2kckp32ppk2kpc';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = verifyToken;
