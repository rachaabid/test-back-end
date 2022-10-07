const cron = require('node-cron');
const Customer = require('../models/Customer')


cron.schedule('0 0 1 * *', () => {
  console.log('reset the number of downloads on the first day of each month');
  // customer.countDownload == 0;
  const customer = Customer.findByIdAndUpdate(req.user.customerId)
  if(customer.countDownload ==! 0){
    Customer.findByIdAndUpdate(req.user.customerId, {countDownload: 0}, {new: true})
};
})