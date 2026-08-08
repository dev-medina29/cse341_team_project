const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const getCategories = require("../controllers/categories");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", getCategories.getAll);
router.get("/:id", getCategories.getSingle);

router.post(
  "/",
  isAuthenticated,
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Category creation payload',
      required: true,
      schema: { $ref: '#/definitions/Category' }
  } */
  validation.validateCategory,
  getCategories.createCategory,
);

router.put(
  "/:id",
  isAuthenticated,
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Category update payload',
      required: true,
      schema: { $ref: '#/definitions/Category' }
  } */
  validation.validateCategory,
  getCategories.updateCategory,
);

router.delete("/:id", isAuthenticated, getCategories.deleteCategory);

module.exports = router;
