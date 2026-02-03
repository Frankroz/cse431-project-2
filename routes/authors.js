const express = require("express");
const router = express.Router();
const authorsControllers = require("../controllers/authors");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", authorsControllers.getAll);
router.get("/:id", authorsControllers.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.authorValidationRules(),
  validation.validate,
  authorsControllers.createAuthor,
);
router.put(
  "/:id",
  isAuthenticated,
  validation.authorValidationRules(),
  validation.validate,
  authorsControllers.updateAuthor,
);
router.delete("/:id", isAuthenticated, authorsControllers.deleteAuthor);

module.exports = router;