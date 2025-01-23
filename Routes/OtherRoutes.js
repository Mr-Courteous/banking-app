const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Investment = require('../Models/Investment')
const Card = require('../Models/Card')
const BankUser = require('../Models/UserModel');
const Transaction = require('../Models/Transactions')
const jwt = require('jsonwebtoken');
const authenticateToken = require ('./authentication');

router.post('/transfer', authenticateToken, async (req, res) => {
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
      const { recipientAccountNumber, amount } = req.body;
  
      const sender = await BankUser.findById(userId);
      const recipient = await BankUser.findOne({ accountNumber: recipientAccountNumber });
  
      // Check if sender and recipient are the same user
      if (sender._id.toString() === recipient._id.toString()) {
        return res.status(400).json({ message: 'Cannot transfer money to yourself' });
      }
  
      if (!sender || !recipient) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (sender.accountBalance < amount) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
  
      // Update sender and recipient balances
      sender.accountBalance -= amount;
      recipient.accountBalance += amount;
  
      // Create a new transaction document
      const transaction = new Transaction({
        senderId: sender._id,
        recipientId: recipient._id,
        amount,
        type: 'transfer',
      });
  
      await Promise.all([sender.save(), recipient.save(), transaction.save()]);
  
      res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
