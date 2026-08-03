const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const getAll = async (req, res) => {
  // #swagger.tags=["posts"]
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("posts").find({}).toArray();
    res.setHeader("Content-type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

const createPost = async (req, res) => {
  // #swagger.tags=["posts"]
  const post = {
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId,
    likes: req.body.likes || 0,
    comments: req.body.comments || [],
  };

  try {
    const response = await mongodb
      .getDatabase()
      .collection("posts")
      .insertOne(post);

    if (response.acknowledged) {
      res.status(201).json({ message: "Post created successfully" });
    } else {
      res.status(500).json({ error: "Failed to create post" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  // #swagger.tags=["posts"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Please enter a valid post ID" });
  }

  const postId = new ObjectId(req.params.id);

  try {
    const response = await mongodb
      .getDatabase()
      .collection("posts")
      .deleteOne({ _id: postId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  createPost,
  deletePost,
};
