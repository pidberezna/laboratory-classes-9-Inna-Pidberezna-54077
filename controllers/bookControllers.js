const Book = require('../models/Book');
const Author = require('../models/Author');

// GET /api/books - lista książek z informacją o autorze
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'firstName lastName');
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving books',
      error: error.message,
    });
  }
};

// POST /api/books - dodanie książki
const createBook = async (req, res) => {
  try {
    const { title, year, author } = req.body;

    // Sprawdź czy autor istnieje
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(404).json({
        success: false,
        message: 'Author not found',
      });
    }

    const book = new Book({
      title,
      year,
      author,
    });

    const savedBook = await book.save();
    await savedBook.populate('author', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: savedBook,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating book',
      error: error.message,
    });
  }
};

// DELETE /api/books/:id - usunięcie książki
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(204).json();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  deleteBook,
};
