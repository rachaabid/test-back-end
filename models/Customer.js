const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required']
  },
  type: {
    type: String,
    required: [true, 'Type is required']
  }
},
  {
    versionKey: false,
    timestamps: true
  });

const Customer = mongoose.model('customer', CustomerSchema);
module.exports = Customer;