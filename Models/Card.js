const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
    cardNumber: String,
    cvv: String,
    expiryDate: Date,
    balance: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });
  

  module.exports = mongoose.model('Card', cardSchema);