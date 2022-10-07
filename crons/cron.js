const cron = require('node-cron');


cron.schedule('0 0 1 * *', () => {
  console.log('reset the number of downloads on the first day of each month');
  customer.countDownload == 0;
});
