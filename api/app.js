const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const restaurantRoutes = require('./routes/restaurants');
const foodRoutes = require('./routes/food');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/restaurants', restaurantRoutes);
app.use('/food', foodRoutes);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.use(errorHandler);

module.exports = app;