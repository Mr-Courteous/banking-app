const express = require('express');
const cron = require('node-cron');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const RegistrationAndLoginRoutes = require ('./Routes/RegistrationRoutes');
const LoginRoute = require ('./Routes/loginRoutes');
const CardsAndInvestmentRoutes = require('./Routes/CardsAndInvestments')
const OtherRoutes = require ('./Routes/OtherRoutes')

const connectDB = require('./DbConnection');






connectDB();



app.use(express.json());

// app.use(cors());

app.use(cors({
    origin: ' http://localhost:5173',
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies)

}));
// https://todo-frontend-ten-phi.vercel.app',
// app.use('/add-new-task', Add);

app.use(bodyParser.json());

app.use(RegistrationAndLoginRoutes);
app.use(LoginRoute);
app.use (CardsAndInvestmentRoutes);
app.use (OtherRoutes);










app.get('/', (req, res) => {
    res.send('Hello from Express!'); 
  });
  








port = 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
