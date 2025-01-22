const express = require('express')
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require ('./authentication')
const BankUser = require('../Models/UserModel');


 


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user1 = await BankUser.findOne({ email });

        if (!user1) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcryptjs.compare(password, user1.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({
            userId: user1._id, email: user1.email,  name: user1.name,
        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user1._id,
                email: user1.email,
                name: user1.name,
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




router.get('/dashboard', authenticateToken, async (req, res) => {
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
      console.log("token gone wrong")

      return res.status(401).json({ message: 'Token has expired h' });
    }
    const userId = decoded.userId;

    const user = await BankUser.findById(userId)
      .select('accountNumber address email phoneNumber name accountBalance');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.json(user);

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: error.message });
  }
});  

module.exports = router;