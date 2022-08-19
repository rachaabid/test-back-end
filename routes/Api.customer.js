const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createCustomer, getCustomers, getCustomerById, deleteCustomer, updateCustomer } = require('../controlers/customer')

router.post('/Customer', passport.authenticate('bearer', { session: false }), createCustomer);
router.get('/Customers', passport.authenticate('bearer', { session: false }), getCustomers);
router.get('Customer/:idCustomer', passport.authenticate('bearer', { session: false }), getCustomerById);
router.put('Customer/:idCustomer', passport.authenticate('bearer', { session: false }), updateCustomer);
router.delete('Customer/:idCustomer', passport.authenticate('bearer', { session: false }), deleteCustomer);


module.exports = router;