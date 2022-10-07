const cron = require('node-cron');


cron.schedule('* * * 1-12 *', () => {
  console.log('display a message every month');
});
