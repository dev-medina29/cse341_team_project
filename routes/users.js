const express = require("express");
const router = express.Router();
const validation = require("../middleware/validation");
const getUsers = require("../controllers/users");
router.get("/", getUsers.getAll);
router.get("/:id", validation.validateUser, getUsers.getSingle);

router.post("/", validation.validateUser, getUsers.createUser);

router.put("/:id", validation.validateUser, getUsers.updateUser);

router.delete("/:id", validation.validateUser, getUsers.deleteUser);

module.exports = router;
