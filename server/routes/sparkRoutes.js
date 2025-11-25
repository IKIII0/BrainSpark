const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/sparkControllers");
const router = express.Router();

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Auth Routes
router.post("/login", login);

module.exports = router;
