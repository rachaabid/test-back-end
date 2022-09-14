const { link } = require('fs');
const Book = require('../models/Book');
const Category = require('../models/Category');

exports.createBook = async (req, res) => {
  try {
    if (req.body.photo == '') {
      req.body.photo = 'https://i.imgur.com/I65uxQr.png'
    }
    if (req.body.content == '') {
      req.body.content = link
    }
    const book = await Book.create(req.body);
    await Category.findByIdAndUpdate(req.category._id, { $push: { books: book._id } }, { new: true });
    res.send({ message: 'Book created' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.idBook);
    res.send(book);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('categories');
    res.send(books);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

exports.getCategoriesForBooks = async (req, res) => {
  try {
    const categories = await Category.find();
    listCategories = [];
    categories.map(category => {
      listCategories.push({ label: category.nameCategory, value: category._id })
    })
    res.send(listCategories);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.updateBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.idBook, req.body);
    res.send({ message: 'Book updated' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

exports.deleteBook = async (req, res) => {
  try {
    // await Category.findByIdAndUpdate(req.category._id, {$pull: {books: req.params.idBook}}, {new: true})
    await Book.findByIdAndRemove(req.params.idBook);
    res.send({ message: 'Book deleted' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

// exports.download = async (req, res) => {
//   try {
//     const filePath = '${__dirname}/uploads/book.pdf';
//     res.download(filePath, 'book.pdf');

//   } catch (error) {
//     res.status(500).send({
//       message: error.message || 'Some error occured'
//     });
//   }
// }

