const express = require('express');
const router = express.Router();
const passport = require('passport');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.resolve('./uploads')
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname)
    const filename = Date.now() + fileExtension
    cb(null, filename)
  }
})

function fileFilter(req, file, cb) {
  const fileExtension = path.extname(file.originalname)
  const acceptedExtensions = ['.pdf']

  cb(null, acceptedExtensions.includes(fileExtension))
}

const upload = multer({ storage: storage, fileFilter: fileFilter});


const { createBook, getBooks, getBookById, deleteBook, updateBook, getCategoriesForBooks, download } = require('../controlers/book');


router.post('/Books',
 [passport.authenticate('bearer', { session: false }), upload.single('content')], 
createBook);

router.get('/Books', 
 passport.authenticate('bearer', { session: false }),
 getBooks);

router.get('/Books/:idBook',
  passport.authenticate('bearer', { session: false }), 
 getBookById);

router.put('/Books/:idBook',
 [passport.authenticate('bearer', { session: false }), upload.single('content')], 
updateBook);

router.delete('/Books/:idBook', 
 passport.authenticate('bearer', { session: false }), 
deleteBook);

router.get('/listCategories',  
  passport.authenticate('bearer', {session: false}),
 getCategoriesForBooks);

 router.get('/books', download)


module.exports = router;