const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const getPosts = require("../controllers/posts");

router.get("/", getPosts.getAll);
router.get("/:id", getPosts.getSingle);

router.post(
  "/",
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
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Post update payload',
      required: true,
      schema: { $ref: '#/definitions/Post' }
  } */
  validation.validatePost,
  getPosts.updatePost
);

router.delete("/:id", getPosts.deletePost);

module.exports = router;
