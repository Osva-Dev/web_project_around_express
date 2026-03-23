const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} = require("../controllers/user_controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateUser);

module.exports = router;
