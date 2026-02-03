const router = require("express").Router();
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use("/authors", require("./authors"));
router.use("/books", require("./books"));

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
