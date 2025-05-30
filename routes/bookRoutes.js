const express = require('express');
const {
  getAllBooks,
  createBook,
  deleteBook,
} = require('../controllers/bookControllers');

const router = express.Router();

// GET /api/books - lista książek z informacją o autorze
router.get('/', getAllBooks);

// POST /api/books - dodanie książki
router.post('/', createBook);

// DELETE /api/books/:id - usunięcie książki
router.delete('/:id', deleteBook);

module.exports = router;
