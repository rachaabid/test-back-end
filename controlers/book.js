
const Book = require('../models/Book');
const Category = require('../models/Category');

exports.createBook = async (req, res) => {
  try {
    if (req.body.photo == '') {
      req.body.photo = 'https://i.imgur.com/I65uxQr.png'
    }
    if (req.file) {
      req.body.contentLink = "http://localhost:3000/uploads/"+req.file.filename
    }
    const book = await Book.create(req.body);
    await Category.findByIdAndUpdate(req.body.category, { $push: { books: book._id } }, { new: true });
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
    const books = await Book.find();
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
    console.log(req.file)
    if (req.file) {
      req.body.contentLink = "http://localhost:3000/uploads/"+req.file.filename
    }
   const book = await Book.findById(req.params.idBook)
   await Category.findByIdAndUpdate(book.category, { $pull: { books: req.params.idBook } }, { new: true });
    await Category.findByIdAndUpdate(req.body.category, { $push: { books: req.params.idBook } }, { new: true });
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
     await Category.findByIdAndUpdate(req.body.category, {$pull: {books: req.params.idBook}}, {new: true})
    await Book.findByIdAndRemove(req.params.idBook);
    res.send({ message: 'Book deleted' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}



