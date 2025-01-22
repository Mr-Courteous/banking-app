const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Can be null for deposits and withdrawals
  amount: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['deposit', 'withdrawal', 'transfer', 'investment', 'withdrawal_investment'], // Add more types as needed
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);