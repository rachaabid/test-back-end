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

app.listen(process.env.port || 3000, function(){
  console.log('now listening for requests');
})