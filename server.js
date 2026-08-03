const bodyParser = require("body-parser");
const express = require("express");
const port = 2026;
const app = express();
const path = require("path");
const mongodb = require("./data/database");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Z-key",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use("/", require("./routes"));

mongodb.initdb((err) => {
  if (err) {
    console.log("There is an error connecting to the database", err);
  } else {
    app.listen(port, () => {
      console.log(`The app is running at localhost:${port}`);
    });
  }
});
