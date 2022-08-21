const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  content: {
    type: String,
  }
},
{
  versionKey: false,
  timestamps: true
});

const Book = mongoose.model('book', BookSchema);
module.exports = Book;