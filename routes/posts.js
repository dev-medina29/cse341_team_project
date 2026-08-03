const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const getPosts = require("../controllers/posts");
router.get("/", getPosts.getAll);

router.post("/", validation.validatePost, getPosts.createPost);

router.delete("/:id", validation.validatePost, getPosts.deletePost);

module.exports = router;
