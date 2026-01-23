const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const { validateObjectId, handleServerError } = require("../utils/index");

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("Authors")
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
    const contactId = new ObjectId(req.params.id);
    if (!validateObjectId(contactId, res)) return;

    const result = await mongodb
      .getDb()
      .db()
      .collection("Authors")
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ error: "Author not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

// POST: Create a new author
const createAuthor = async (req, res) => {
  try {
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      email: req.body.email,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("Authors")
      .insertOne(author);
    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the author.",
        );
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

// PUT: Update an existing author
const updateAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      email: req.body.email,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("Authors")
      .replaceOne({ _id: authorId }, author);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the author.",
        );
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

// DELETE: Delete a contact
const deleteAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("Authors")
      .deleteOne({ _id: authorId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the author.",
        );
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
