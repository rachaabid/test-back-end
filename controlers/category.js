const Book = require('../models/Book');
const Category = require('../models/Category');

exports.createCategory = async (req, res)=>{
  try {
    await Category.create(req.body);
    res.send({message: 'Category created'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

exports.getCategories = async (req, res)=>{
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    }); 
  }
}

exports.getCategoryById = async (req, res)=>{
  try {
   const category = await Category.findById(req.params.idCategory).populate('books');
   res.send(category); 
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}

exports.updateCategory = async (req, res)=>{
  try {
    await Category.findByIdAndUpdate(req.params.idCategory, req.body);
    res.send({message: 'Category updated'});
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    }); 
  }
}

exports.deleteCategory = async (req, res)=>{
  try {
   const category = await Category.findByIdAndRemove(req.params.idCategory);
   category.books.map(async (id)=>{
    await Book.findByIdAndRemove(id)
   })
   await Category.findByIdAndRemove(req.params.idCategory)
   res.send({message: 'Category deleted'}) 
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occured'
    });
  }
}



