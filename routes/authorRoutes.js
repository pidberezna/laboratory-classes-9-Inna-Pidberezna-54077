const express = require('express');
const {
  getAllAuthors,
  updateAuthor,
  createAuthor,
} = require('../controllers/authorControllers');

const router = express.Router();

// GET /api/authors - lista autorów
router.get('/', getAllAuthors);

// POST /api/authors - dodanie autora
router.post('/', createAuthor);

// PUT /api/authors/:id - edycja autora
router.put('/:id', updateAuthor);

module.exports = router;
