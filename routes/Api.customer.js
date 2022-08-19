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

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: {fieldSize: 25*1024*1024} })

const { createCustomer, getCustomers, getCustomerById, deleteCustomer, updateCustomer } = require('../controlers/customer')

router.post('/Customer', [passport.authenticate('bearer', { session: false }), upload.single('file')], createCustomer);
router.get('/Customers', passport.authenticate('bearer', { session: false }), getCustomers);
router.get('Customer/:idCustomer', passport.authenticate('bearer', { session: false }), getCustomerById);
router.put('Customer/:idCustomer', [passport.authenticate('bearer', { session: false }), upload.single('file')], updateCustomer);
router.delete('Customer/:idCustomer', passport.authenticate('bearer', { session: false }), deleteCustomer);


module.exports = router;