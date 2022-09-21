const mongoose = require('mongoose');
const path = require('path');
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
  photo: {
   type: String,
   default: 'https://i.imgur.com/I65uxQr.png'
  },
  content: {
    type: String,
    default: link = path.resolve('../uploads')
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "category"
    }
  ]
},
{
  versionKey: false,
  timestamps: true
});

const Book = mongoose.model('book', BookSchema);
module.exports = Book;