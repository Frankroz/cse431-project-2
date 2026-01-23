const { body, validationResult } = require("express-validator");

const authorValidationRules = () => {
  return [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("nationality").notEmpty().withMessage("Nationality is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
  ];
};

const bookValidationRules = () => {
  return [
    body("title").notEmpty().withMessage("Title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("isbn").notEmpty().withMessage("ISBN is required"),
    body("pages").isNumeric().withMessage("Pages must be a number"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = { authorValidationRules, bookValidationRules, validate };
