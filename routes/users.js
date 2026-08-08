const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const getUsers = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", getUsers.getAll);
router.get("/:id", getUsers.getSingle);

router.post(
  "/",
  isAuthenticated,
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User creation payload',
      required: true,
      schema: { $ref: '#/definitions/User' }
  } */
  validation.validateUser,
  getUsers.createUser,
);

router.put(
  "/:id",
  isAuthenticated,
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User update payload',
      required: true,
      schema: { $ref: '#/definitions/User' }
  } */
  validation.validateUser,
  getUsers.updateUser,
);

router.delete("/:id", isAuthenticated, getUsers.deleteUser);

module.exports = router;
