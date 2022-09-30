const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');

exports.createCustomer = async (req, res) => {
  try {
    const customerFound = await Customer.findOne({ email: req.body.email })
    if (customerFound) {
      return res.status(400).send({ message: 'the email is already in use' });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      await Customer.create(req.body);
      res.send({ message: 'Customer created' })
    }
  }
   catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.idCustomer);
    res.send(customer)
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.updateCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.idCustomer, req.body);
    res.send({ message: 'Customer updated' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndRemove(req.params.idCustomer);
    res.send({ message: 'Customer deleted' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.numberDownload = async (req, res)=>{
  try {
    const customer =  await Customer.findByIdAndUpdate(req.user.customerId)
    if(customer.countDownload<5){
      await Customer.findByIdAndUpdate(req.user.customerId, {$inc:{countDownload: +1}}, {new: true})
    res.send({message: 'downloaded succefully'})
    }
    else {
      res.status(400).send({message: "You can't download only five per month"})
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}