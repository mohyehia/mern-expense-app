const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('../src/routes/user.route');
const expenseRoutes = require('../src/routes/expense.route');

const app = express();

// __________________ DB Config __________________ //
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () =>{
    console.log('connected to mongo db!');
})
mongoose.connection.on('error', (err) =>{
    console.error(`error connecting to mongo db: ${err}`);
});
// __________________ Middleware __________________ //
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// __________________ Routes __________________ //
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);
module.exports = app;