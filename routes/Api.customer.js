const express = require('express');
const router = express.Router();
const passport = require('passport');


const { createCustomer, getCustomers, getCustomerById, deleteCustomer, updateCustomer, numberDownload } = require('../controlers/customer')

router.post('/Customers', 
 passport.authenticate('bearer', { session: false }),  
createCustomer);

router.get('/Customers', 
 passport.authenticate('bearer', { session: false }), 
getCustomers);

router.get('/Customers/:idCustomer',
  passport.authenticate('bearer', { session: false }), 
 getCustomerById);

router.put('/Customers/:idCustomer', 
 passport.authenticate('bearer', { session: false }), 
updateCustomer);

router.delete('/Customers/:idCustomer', 
 passport.authenticate('bearer', { session: false }), 
deleteCustomer);

router.put('/download/:customerId', 
passport.authenticate('bearer', { session: false }), 
numberDownload)


module.exports = router;