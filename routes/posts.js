const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const getPosts = require("../controllers/posts");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", getPosts.getAll);
router.get("/:id", getPosts.getSingle);

router.post(
  "/",
  isAuthenticated,
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Post creation payload',
      required: true,
      schema: { $ref: '#/definitions/Post' }
  } */
  validation.validatePost,
  getPosts.createPost,
);

router.put(
  "/:id",
  isAuthenticated,
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Post update payload',
      required: true,
      schema: { $ref: '#/definitions/Post' }
  } */
  validation.validatePost,
  getPosts.updatePost
);

router.delete("/:id", isAuthenticated, getPosts.deletePost);

module.exports = router;
