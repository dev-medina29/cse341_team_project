const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/", require("./swagger"));
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

module.exports = router;
