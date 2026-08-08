const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const comments = await mongodb
      .getDatabase()
      .collection("comments")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error retrieving comments." });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID." });
    const comment = await mongodb
      .getDatabase()
      .collection("comments")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!comment)
      return res.status(404).json({ message: "Comment not found." });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(comment);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error retrieving comment." });
  }
};

const createComment = async (req, res) => {
  try {
    const comment = {
      postId: new ObjectId(req.body.postId),
      authorId: req.body.authorId || null,
      content: req.body.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await mongodb
      .getDatabase()
      .collection("comments")
      .insertOne(comment);
    if (response.acknowledged) res.status(201).json(response);
    else res.status(500).json({ message: "Error creating comment." });
  } catch (err) {
    res.status(500).json({ message: err.message || "Error creating comment." });
  }
};

const updateComment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID." });
    const comment = {
      postId: new ObjectId(req.body.postId),
      authorId: req.body.authorId,
      content: req.body.content,
      updatedAt: new Date(),
    };
    const response = await mongodb
      .getDatabase()
      .collection("comments")
      .replaceOne({ _id: new ObjectId(req.params.id) }, comment);
    if (response.modifiedCount > 0) res.status(204).send();
    else
      res
        .status(404)
        .json({ message: "Comment not found or no changes made." });
  } catch (err) {
    res.status(500).json({ message: err.message || "Error updating comment." });
  }
};

const deleteComment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID." });
    const response = await mongodb
      .getDatabase()
      .collection("comments")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (response.deletedCount > 0) res.status(204).send();
    else res.status(404).json({ message: "Comment not found." });
  } catch (err) {
    res.status(500).json({ message: err.message || "Error deleting comment." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createComment,
  updateComment,
  deleteComment,
};
