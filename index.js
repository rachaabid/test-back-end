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

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:false, limit: '50mb'}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());


require('./passport-strategies/bearer');
require('./db/connect');

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests');
})