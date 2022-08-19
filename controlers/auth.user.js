const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const { sendEmail } = require('./sendEmail');

exports.signup = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound) {
      return res.send({ message: 'the email is already in use' });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      await User.create(req.body);
      res.json({ message: 'User created' });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound) {
      return res.status(400).send({ message: 'Mail or password is invalid' });
    }
    const valid = bcrypt.compare(req.body.password, userFound.password)
    if (!valid) {
      return res.status(400).send({ message: 'Mail or password is invalid' })
    }
    res.status(200).send({
      message: 'logged in succeffuly',
      token: jwt.sign(
        { userId: userFound._id, role: userFound.role }, process.env.SECRET_KEY,
        { expiresIn: '1d' }
      )
    }
    );
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}