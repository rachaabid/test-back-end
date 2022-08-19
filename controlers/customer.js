const Customer = require('../models/Customer');

exports.createCustomer = async (req, res)=>{
  try {
  await Customer.create(req.body);
  res.send({message: 'Customer created'})  
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });  
  }
}

exports.getCustomers = async (req, res)=>{
  try {
   const customers = await Customer.find();
   res.send(customers);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}

exports.getCustomerById = async (req, res)=>{
  try {
    const customer = await Customer.findById(req.params.idCustomer);
    res.send(customer)
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.updateCustomer = async (req, res)=>{
  try {
    await Customer.findByIdAndUpdate(req.params.idCustomer,  req.body);
    res.send({message: 'Customer updated'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteCustomer = async (req, res)=>{
  try {
    await Customer.findByIdAndRemove(req.params.idCustomer);
    res.send({message: 'Customer deleted'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}