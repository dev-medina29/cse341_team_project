const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const getComments = require("../controllers/comments");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", getComments.getAll);
router.get("/:id", getComments.getSingle);

router.post(
  "/",
  isAuthenticated,
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Comment creation payload',
      required: true,
      schema: { $ref: '#/definitions/Comment' }
  } */
  validation.validateComment,
  getComments.createComment,
);

router.put(
  "/:id",
  isAuthenticated,
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Comment update payload',
      required: true,
      schema: { $ref: '#/definitions/Comment' }
  } */
  validation.validateComment,
  getComments.updateComment,
);

router.delete("/:id", isAuthenticated, getComments.deleteComment);

module.exports = router;
