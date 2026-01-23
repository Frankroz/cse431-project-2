const express = require('express');
const router = express.Router();
const booksControllers = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', booksControllers.getAll);
router.get('/:id', booksControllers.getSingle);

router.post('/', validation.bookValidationRules(), validation.validate, booksControllers.createBook);
router.put('/:id', validation.bookValidationRules(), validation.validate, booksControllers.updateBook);
router.delete('/:id', booksControllers.deleteBook);

module.exports = router;