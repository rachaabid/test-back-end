const express = require('express');
const router = express.Router();

const {signup, login} = require('../controlers/auth');

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:resetToken', resetPassword);

module.exports = router;