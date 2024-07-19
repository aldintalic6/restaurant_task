require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const verifyToken = require('./middleware/jwtProtected');

const restaurantRoutes = require('./routes/restaurants');
const foodRoutes = require('./routes/food');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');

const app = express();

// Define corsOptions
const corsOptions = {
    origin: 'http://localhost:3000', // Update to the frontend port if different
    credentials: true,
};

app.use(cors(corsOptions)); // Use corsOptions
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute);

app.use('/restaurants', restaurantRoutes);
app.use('/food', foodRoutes);

app.use(errorHandler);

module.exports = app;
