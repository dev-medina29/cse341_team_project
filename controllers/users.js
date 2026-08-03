const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const getAll = async (req, res) => {
  // #swagger.tags=["users"]
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("bloggers").find({}).toArray();
    res.setHeader("Content-type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags=["users"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "Please enter a valid ID to find the user" });
    }
    const userid = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db
      .collection("bloggers")
      .find({ _id: userid })
      .toArray();
    res.setHeader("Content-type", "application/json");
    res.status(200).json(result[0] || null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags=["users"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "Please enter a valid ID to find the user" });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      role: req.body.role,
    };

    const response = await mongodb
      .getDatabase()
      .collection("bloggers") //
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "user updated successfully" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

const createUser = async (req, res) => {
  // #swagger.tags=["users"]
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      role: req.body.role,
    };

    // Simple validation for required fields
    if (!user.username || !user.email || !user.password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await mongodb
      .getDatabase()
      .collection("bloggers")
      .insertOne(user);

    if (response.acknowledged) {
      res.status(200).json({ message: "User created successfully" });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating the user");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags=["users"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("bloggers")
      .deleteOne({ _id: userId }, true);

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
