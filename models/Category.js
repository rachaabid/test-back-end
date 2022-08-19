const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  nameCategory: {
    type: String,
    required: [true, 'Name category is required']
  },
  listBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "book"
    }
  ]
},
{
  versionKey: false,
  timestamps: true
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;