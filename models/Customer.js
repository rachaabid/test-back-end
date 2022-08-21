const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required']
  },
  email: {
    type: String,
  },
  password: {
    type: String
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