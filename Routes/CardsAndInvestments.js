const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Investment = require('../Models/Investment')
const Card = require('../Models/Card')
const BankUser = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authentication')





function generateCardNumber() {
    // Implement a secure card number generation algorithm here
    // This is a simplified example
    return Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
}

function generateCVV() {
    // Implement a secure CVV generation algorithm here
    // This is a simplified example
    return Math.floor(Math.random() * 1000) + 100;
}

function generateExpiryDate() {
    // Implement a more realistic date generation algorithm here
    // This is a simplified example
    const now = new Date();
    now.setMonth(now.getMonth() + 24); // Expiry date in 2 years
    return now;
}
router.post('/create-card', authenticateToken, async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const expirationTime = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000);



        if (expirationTime < currentTime) {
            return res.status(401).json({ message: 'Token has expired' });
        }
        const userId = decoded.userId;
        // Generate card details (replace with secure methods)
        const cardNumber = generateCardNumber();
        const cvv = generateCVV();
        const expiryDate = generateExpiryDate();

        const newCard = new Card({
            cardNumber,
            cvv,
            expiryDate,
            userId
        });

        await newCard.save();

        res.status(201).json({
            message: 'Card created successfully',
            cardDetails: newCard
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});




router.post('/start-investment', authenticateToken, async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const expirationTime = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000);



        if (expirationTime < currentTime) {
            return res.status(401).json({ message: 'Token has expired' });
        }
        const userId = decoded.userId;
        const { amount } = req.body;

        const user = await BankUser.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.accountBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 30); // 30 days from start date

        const newInvestment = new Investment({
            amount,
            startDate,
            endDate,
            dailyProfit: (amount * 0.30).toFixed(2),
            userId
        });

        await newInvestment.save();

        user.accountBalance -= amount;
        await user.save();

        res.status(201).json({ message: 'Investment started successfully', investment: newInvestment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;