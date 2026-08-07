const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET /users 
const getAll = async (req, res) => {
  try {
    const users = await mongodb
      .getDatabase()
      .collection("users")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "Error occurred while retrieving users.",
      });
  }
};

// GET /users/:id 
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid user ID to find a user." });
    }
    const userId = new ObjectId(req.params.id);
    const user = await mongodb
      .getDatabase()
      .collection("users")
      .findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "Error occurred while retrieving user.",
      });
  }
};

// POST /users 
const createUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.email) {
      return res
        .status(400)
        .json({ message: "Username and email are required fields." });
    }

    const user = {
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName || "",
      bio: req.body.bio || "",
      avatarUrl: req.body.avatarUrl || "",
      createdAt: new Date(),
    };

    const response = await mongodb
      .getDatabase()
      .collection("users")
      .insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while creating the user." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error occurred while creating user." });
  }
};

// PUT /users/:id 
const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid user ID to update a user." });
    }
    const userId = new ObjectId(req.params.id);

    const user = {
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName,
      bio: req.body.bio,
      avatarUrl: req.body.avatarUrl,
      createdAt: req.body.createdAt ? new Date(req.body.createdAt) : new Date(),
    };

    const response = await mongodb
      .getDatabase()
      .collection("users")
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found or no changes made." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error occurred while updating user." });
  }
};

// DELETE /users/:id 
const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid user ID to delete a user." });
    }
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("users")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error occurred while deleting user." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
