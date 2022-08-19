const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createCategory, getCategories, getCategoryById, deleteCategory, updateCategory } = require('../controlers/category')

router.post('/Category', passport.authenticate('bearer', { session: false }), createCategory);
router.get('/Categories', passport.authenticate('bearer', { session: false }), getCategories);
router.get('Category/:idCategory', passport.authenticate('bearer', { session: false }), getCategoryById);
router.put('Category/:idCategory', passport.authenticate('bearer', { session: false }), updateCategory);
router.delete('Category/:idCategory', passport.authenticate('bearer', { session: false }), deleteCategory);


module.exports = router;