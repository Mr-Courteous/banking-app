const mongoose = require('mongoose');



const otpSchema = new mongoose.Schema({

    otp: String,
    email: String,
    createdAt: Date,
    expiresAt: Date

});

module.exports = mongoose.model('Otp', otpSchema);  