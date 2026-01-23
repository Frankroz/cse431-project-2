const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const app = express();
const env = require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route for Swagger Documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));


app.use("/authors", require("./routes/authors.js"));
app.use("/books", require("./routes/books.js"));

app.use("/", require("./routes/index.js").displayWelcome);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database listening - app listening on ${host}:${port}`);
    });
  }
});
