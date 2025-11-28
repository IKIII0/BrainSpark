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

// Test Routes (untuk debugging)
router.get("/test-admin", async (req, res) => {
  try {
    const pool = require("../config/db");
    
    // Test admin lookup
    const email = req.query.email || 'admin@gmail.com';
    const result = await pool.query('SELECT email, nama_admin FROM admin WHERE email = $1', [email]);
    
    if (result.rows.length > 0) {
      res.json({
        status: 'success',
        message: 'Admin found',
        data: result.rows[0]
      });
    } else {
      res.json({
        status: 'error',
        message: 'Admin not found',
        email: email
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
