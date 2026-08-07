const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET /posts 
const getAll = async (req, res) => {
  try {
    const posts = await mongodb
      .getDatabase()
      .collection("posts")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "Error occurred while retrieving posts.",
      });
  }
};

// GET /posts/:id 
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid post ID to find a post." });
    }
    const postId = new ObjectId(req.params.id);
    const post = await mongodb
      .getDatabase()
      .collection("posts")
      .findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "Error occurred while retrieving post.",
      });
  }
};

// POST /posts 
const createPost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res
        .status(400)
        .json({ message: "Title and content are required fields." });
    }

    const post = {
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.authorId || null,
      categoryId: req.body.categoryId || null,
      tags: req.body.tags || [],
      likesCount: req.body.likesCount || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await mongodb
      .getDatabase()
      .collection("posts")
      .insertOne(post);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while creating the post." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error occurred while creating post." });
  }
};

// PUT /posts/:id 
const updatePost = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid post ID to update a post." });
    }
    const postId = new ObjectId(req.params.id);

    const updatedPost = {
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.authorId,
      categoryId: req.body.categoryId,
      tags: req.body.tags || [],
      updatedAt: new Date(),
    };

    const response = await mongodb
      .getDatabase()
      .collection("posts")
      .replaceOne({ _id: postId }, updatedPost);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Post not found or no changes made." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error occurred while updating post." });
  }
};

// DELETE /posts/:id 
const deletePost = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid post ID to delete a post." });
    }
    const postId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("posts")
      .deleteOne({ _id: postId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Post not found." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error occurred while deleting post." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPost,
  updatePost,
  deletePost,
};
