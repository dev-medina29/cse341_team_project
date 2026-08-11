const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let database;

const initDb = async () => {
  if (database) {
    console.log("Database is already initialized!");
    return database;
  }
  try {
    await client.connect();
    // Same as devpulse: no separate db-name variable required.
    // If MONGODB_DB_NAME is set, use it; otherwise fall back to the
    // database name already embedded in MONGODB_URI.
    database = client.db(process.env.MONGODB_DB_NAME);
    console.log("Database initialized successfully!");
    return database;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized!");
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};