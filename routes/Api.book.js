const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createBook, getBooks, getBookById, deleteBook, updateBook } = require('../controlers/book')

router.post('/Book', passport.authenticate('bearer', { session: false }), createBook);
router.get('/Books', passport.authenticate('bearer', { session: false }), getBooks);
router.get('Book/:idBook', passport.authenticate('bearer', { session: false }), getBookById);
router.put('Book/:idBook', passport.authenticate('bearer', { session: false }), updateBook);
router.delete('Book/:idBook', passport.authenticate('bearer', { session: false }), deleteBook);


module.exports = router;