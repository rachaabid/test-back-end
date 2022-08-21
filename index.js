const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session') 
const passport = require('passport')

const app = express();
require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 app.use(session({
   secret: process.env.SECRET_KEY,
   resave: false,
   saveUninitialized: true,}));
 app.use(passport.initialize());
 app.use(passport.session());


require('./passport-strategies/bearer');
require('./db/connect');

const apiAuth = require('./routes/Api.auth');
const apiBook = require('./routes/Api.book');
const apiCustomer = require('./routes/Api.customer');
const apiCategory = require('./routes/Api.category');
const apiUser = require('./routes/api.user')

app.use('/api/v1', apiAuth);
app.use('/api/v1', apiBook);
app.use('/api/v1', apiCustomer);
app.use('/api/v1', apiCategory);
app.use('api/v1', apiUser);

app.listen(process.env.port || 3000, function () {
  console.log('now listening for requests');
})