const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound) {
      return res.status(400).send({ message: 'the email is already in use' });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      await User.create(req.body);
      res.json({ message: 'User created' });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getAllUsers = async (req, res)=>{
  try {
   const users = await User.find();
   res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}

exports.getUserById = async (req, res)=>{
  try {
    const user = await User.findById(req.params.idUser);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}

exports.updateUser = async (req, res)=>{
  try {
   await User.findByIdAndUpdate(req.params.idUser, req.body);
    res.send({message: 'User updated'});
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteUser = async (req, res)=>{
  try {
    await User.findByIdAndRemove(req.params.idUser)
    res.send({message: 'User deleted'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}
