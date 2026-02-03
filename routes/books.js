const express = require("express");
const router = express.Router();
const booksControllers = require("../controllers/books");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", booksControllers.getAll);
router.get("/:id", booksControllers.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.bookValidationRules(),
  validation.validate,
  booksControllers.createBook,
);
router.put(
  "/:id",
  isAuthenticated,
  validation.bookValidationRules(),
  validation.validate,
  booksControllers.updateBook,
);
router.delete("/:id", isAuthenticated, booksControllers.deleteBook);

module.exports = router;