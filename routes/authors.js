const express = require('express');
const router = express.Router();
const authorsControllers = require('../controllers/authors');
const validation = require('../middleware/validate');

router.get('/', authorsControllers.getAll);
router.get('/:id', authorsControllers.getSingle);

router.post('/', validation.authorValidationRules(), validation.validate, authorsControllers.createAuthor);
router.put('/:id', validation.authorValidationRules(), validation.validate, authorsControllers.updateAuthor);
router.delete('/:id', authorsControllers.deleteAuthor);

module.exports = router;