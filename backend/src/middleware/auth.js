const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Simple authentication middleware
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        // For testing purposes, allow requests without token
        if (!token) {
            console.log('No token provided, but allowing request for testing');
            req.token = 'test_token';
            return next();
        }

        // For now, we'll just pass the token in the request
        // In a real application, you would verify the JWT token here
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            error: 'Authentication failed' 
        });
    }
};

module.exports = auth; 