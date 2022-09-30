const express = require('express');
const router = express.Router();

const {signup, login, resetPassword, forgotPassword, logOut, loginCustomer} = require('../controlers/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/loginCustomer', loginCustomer)

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:resetToken', resetPassword);

router.get('/logout', logOut)

module.exports = router;