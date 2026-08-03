const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");

let database;

const initdb = async (callback) => {
  if (database) {
    if (callback) return callback(null, database);
    return database;
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    database = client.db();
    if (callback) return callback(null, database);
    return database;
  } catch (error) {
    if (callback) return callback(error);
    throw error;
  }
};

const getDatabase = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

module.exports = { initdb, getDatabase };
