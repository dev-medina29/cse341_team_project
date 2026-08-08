const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const categories = await mongodb
      .getDatabase()
      .collection("categories")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error retrieving categories." });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Must use a valid category ID." });
    }
    const category = await mongodb
      .getDatabase()
      .collection("categories")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!category)
      return res.status(404).json({ message: "Category not found." });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(category);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error retrieving category." });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = {
      name: req.body.name,
      description: req.body.description || "",
      slug: req.body.slug,
    };
    const response = await mongodb
      .getDatabase()
      .collection("categories")
      .insertOne(category);
    if (response.acknowledged) res.status(201).json(response);
    else res.status(500).json({ message: "Error creating category." });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error creating category." });
  }
};

const updateCategory = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID." });
    const category = {
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug,
    };
    const response = await mongodb
      .getDatabase()
      .collection("categories")
      .replaceOne({ _id: new ObjectId(req.params.id) }, category);
    if (response.modifiedCount > 0) res.status(204).send();
    else
      res
        .status(404)
        .json({ message: "Category not found or no changes made." });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error updating category." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid ID." });
    const response = await mongodb
      .getDatabase()
      .collection("categories")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (response.deletedCount > 0) res.status(204).send();
    else res.status(404).json({ message: "Category not found." });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error deleting category." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCategory,
  updateCategory,
  deleteCategory,
};
