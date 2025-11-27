const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  getAllMateri,
  getMateriById,
  createMateri,
  updateMateri,
  deleteMateri,
} = require("../controllers/sparkControllers");
const router = express.Router();

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Materi Routes
router.get("/materi", getAllMateri);
router.get("/materi/:id", getMateriById);
router.post("/materi", createMateri);
router.put("/materi/:id", updateMateri);
router.delete("/materi/:id", deleteMateri);

// Auth Routes
router.post("/login", login);

module.exports = router;
