const express = require('express');
const router = express.Router();

const {signup, login} = require('../controlers/auth');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;