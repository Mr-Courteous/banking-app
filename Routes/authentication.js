const express = require('express');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If no token, return 401

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please, login again' });
            }
            return res.sendStatus(403); // Other errors (e.g., invalid signature) return 403
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken; 