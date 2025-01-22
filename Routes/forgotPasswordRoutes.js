const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs'); // For password hashing
const nodemailer = require('nodemailer'); // For sending emails
const BankUsers = require('../Models/UserModel');
const Otp = require('../Models/Otp')
const authenticateToken = require ('./authentication')




function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}




async function sendAdminVerificationEmail(adminEmail, teacherId, verificationCode) {
    const transporter = nodemailer.createTransport({
        // Configure your email service (e.g., Gmail, SendGrid)
        service: 'gmail',
        auth: {
            user: 'inumiduncourteous@gmail.com',
            pass: 'okxo xjjt arfe upkw',
        },
    });

    const verificationLink = `${process.env.FRONTEND_URL}/admin/verify-teacher/${teacherId}/${verificationCode}`;

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: emaail,
        subject: 'Teacher Registration Request',
        text: `You or someone else initiated registration with our bank. Confirm this by clicking this link: ${verificationLink}`,
    };
 
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to admin successfully');
    } catch (error) {
        console.error('Error sending email to admin:', error);
    }
}
// Registration route with email verification

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address, adminEmail } = req.body;

        // Check for existing user (teacher or regular user)
        const existingUser = await BankUsers.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'This email is already associated with an account. Try registering with a new email.'
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        // Generate verification code
        const verificationCode = generateVerificationCode();

        // Create new teacher with temporary verification code
        const newBankUser = new BankUsers({
            name,
            email,
            phoneNumber,
            address,
            verificationCode,
            password: hashedPassword,
        });

        // Save teacher data temporarily without verification
        await newBankUser.save({ validateBeforeSave: false });

        // Send verification email to admin
        await sendAdminVerificationEmail(email, newBankUser._id, verificationCode);

        res.status(201).json({
            message: 'Teacher registration email sent.',
        });

    } catch (error) {
        console.error('Error registering teacher:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering teacher',
            error: error.message
        });
    }
});



// router.get('/new', (req, res) => {
//     res.send('Hello from Taiwo Express!'); 
//   });



router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    const existingOtp = await Otp.findOne({ email, expiresAt: { $gt: Date.now() } });
    if (existingOtp) {
        return res.status(400).send({ message: 'An OTP has already been sent to this email. Did not receive Otp? Try again in after 5 minutes' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'inumiduncourteous@gmail.com',
            pass: 'okxo xjjt arfe upkw',
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Verify your email',
        text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    await Otp.create({ email, otp, expiresAt: Date.now() + 300000 }); // 5 minutes
    res.send({ message: 'OTP sent successfully' });
});



router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    const storedOtp = await Otp.findOne({ email, otp, expiresAt: { $gt: Date.now() } });
    if (storedOtp) {
        await Otp.deleteOne({ _id: storedOtp._id });
        res.send({ message: 'OTP is valid' });
    } else {
        res.status(401).send({ message: 'Invalid OTP' });
    }
});

// Register User
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    const existingUser = await newBankUser.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: 'Email already exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);


    const user = new User({ email, password: hashedPassword, name });
    await newBankUser.save();
    res.send({ message: 'User registered successfully' });
});







module.exports = router;