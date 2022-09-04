const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createCategory, getCategories, getCategoryById, deleteCategory, updateCategory } = require('../controlers/category');


router.post('/Categories',
  passport.authenticate('bearer', { session: false }), 
 createCategory);

router.get('/Categories', 
 passport.authenticate('bearer', { session: false }), 
getCategories);

router.get('/Categories/:idCategory', 
 passport.authenticate('bearer', { session: false }), 
getCategoryById);

router.put('/Categories/:idCategory', 
 passport.authenticate('bearer', { session: false }), 
updateCategory);

router.delete('/Categories/:idCategory', 
 passport.authenticate('bearer', { session: false }),
 deleteCategory);

module.exports = router;