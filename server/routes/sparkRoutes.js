const express = require("express");
const { isAdmin } = require("../middleware/adminAuth");
const {
  getAllAdmins,
  createAdmin,
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

// Admin Routes
router.get("/admin", getAllAdmins);
router.post("/admin", createAdmin);

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Materi Routes
router.get("/materi", getAllMateri);
router.get("/materi/:id", getMateriById);
router.post("/materi", isAdmin, createMateri);
router.put("/materi/:id", isAdmin, updateMateri);
router.delete("/materi/:id", isAdmin, deleteMateri);

// Auth Routes
router.post("/login", login);

module.exports = router;
