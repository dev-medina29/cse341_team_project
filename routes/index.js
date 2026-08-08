const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/", require("./swagger"));
router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/categories", require("./categories"));
router.use("/comments", require("./comments"));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

module.exports = router;
