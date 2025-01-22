const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, }, // Validate phone number format
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    verificationCode: { type: String, expires: 3600 }, // Expires after 1 hour
    // isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    accountNumber: { type: String, required: true },
    accountBalance: { type: Number, require: true , default: 1000}

});

module.exports = mongoose.model('BankUser', userSchema);