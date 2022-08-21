const express = require('express');
const router = express.Router();
 const passport = require('passport');

 const { createUser, getAllUsers, getUserById, deleteUser, updateUser } = require('../Controlers/User');


router.post('/Users',
   passport.authenticate('bearer', {session: false}),
 createUser);

router.get('/Users',
  passport.authenticate('bearer', {session: false}),
  getAllUsers);

router.get('/Users/:idUser',
   passport.authenticate('bearer', {session: false}),
  getUserById);

router.put('/Users/:idUser',
  passport.authenticate('bearer', {session: false}),
   updateUser);

router.delete('/Users/:idUser',
   passport.authenticate('bearer', {session: false}),
  deleteUser);

module.exports = router;
