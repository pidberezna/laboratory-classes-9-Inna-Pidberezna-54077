const Author = require('../models/Author');

// GET /api/authors - lista autorów
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ lastName: 1, firstName: 1 });
    res.status(200).json({
      success: true,
      count: authors.length,
      data: authors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving authors',
      error: error.message,
    });
  }
};

// PUT /api/authors/:id - edycja autora
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    const author = await Author.findByIdAndUpdate(
      id,
      { firstName, lastName },
      {
        new: true, // zwróć zaktualizowany dokument
        runValidators: true, // uruchom walidację
      }
    );

    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Author updated successfully',
      data: author,
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

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid author ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating author',
      error: error.message,
    });
  }
};

// POST /api/authors - dodanie autora (bonus)
const createAuthor = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const author = new Author({
      firstName,
      lastName,
    });

    const savedAuthor = await author.save();

    res.status(201).json({
      success: true,
      message: 'Author created successfully',
      data: savedAuthor,
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
      message: 'Error creating author',
      error: error.message,
    });
  }
};

module.exports = {
  getAllAuthors,
  updateAuthor,
  createAuthor,
};
