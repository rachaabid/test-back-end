const Book = require('../models/Book');
const Category = require('../models/Category');

exports.createBook = async (req, res)=>{
  try {
    await Book.create(req.body);
    res.send({message: 'Book created'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

exports.getBookById = async (req, res)=>{
  try {
    const book = await Book.findById(req.params.idBook);
    res.send(book);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    }); 
  }
}

exports.getBooks = async (req, res)=>{
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    }); 
  }
}

exports.updateBook = async (req, res)=>{
  try {
    await Book.findByIdAndUpdate(req.params.idBook, req.body);
    res.send({message: 'Book updated'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    }); 
  }
}

exports.deleteBook = async (req, res)=>{
  try {
    await Book.findByIdAndRemove(req.params.idBook);
    res.send({message: 'Book deleted'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    }); 
  }
}

