const mongoose = require('mongoose');



const investmentSchema = new mongoose.Schema({
  amount: Number,
  startDate: Date,
  endDate: Date,
  dailyProfit: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('Investment', investmentSchema);
