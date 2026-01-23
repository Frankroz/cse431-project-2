const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const { validateObjectId, handleServerError } = require("../utils/index");

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getSingle = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    if (!validateObjectId(bookId, res)) return;

    const result = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .findOne({ _id: bookId });

    if (!result) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST: Create a new book
const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      pages: req.body.pages,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the book.",
        );
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

// PUT: Update an existing book
const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      pages: req.body.pages,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .replaceOne({ _id: bookId }, book);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the book.",
        );
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

// DELETE: Delete a contact
const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .deleteOne({ _id: bookId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the book.",
        );
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook,
};
