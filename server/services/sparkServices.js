const pool = require("../config/db");
const passwordUtils = require("../utils/passwordUtils");

// User Services
async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
  return result.rows;
}

async function getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

async function createUser(data) {
  const { nama_user, email_user, pass, nim, universitas, no_hp } = data;
  console.log("Creating user with data:", {
    nama_user,
    email_user,
    pass,
    nim,
    universitas,
    no_hp,
  });
  
  // Hash password before saving
  const hashedPassword = await passwordUtils.hashPassword(pass);
  
  const result = await pool.query(
    "INSERT INTO users (nama_user, email_user, pass, nim, universitas, no_hp) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [nama_user, email_user, hashedPassword, nim, universitas, no_hp]
  );
  console.log("Created user:", result.rows[0]);
  return result.rows[0];
}

async function updateUser(id, data) {
  const { nama_user, email_user, pass, nim, universitas, no_hp } = data;
  const result = await pool.query(
    `UPDATE users 
    SET nama_user = $1, email_user = $2, pass = $3, nim = $4, universitas = $5, no_hp = $6
    WHERE id = $7 
    RETURNING *`,
    [nama_user, email_user, pass, nim, universitas, no_hp, id]
  );
  return result.rows[0];
}

async function deleteUser(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

async function login(email, password) {
  // First get user by email
  const result = await pool.query(
    "SELECT * FROM users WHERE email_user = $1",
    [email]
  );
  
  if (result.rows.length === 0) {
    return null; // User not found
  }
  
  const user = result.rows[0];
  
  // Verify password
  const isPasswordValid = await passwordUtils.verifyPassword(password, user.pass);
  
  if (!isPasswordValid) {
    return null; // Password incorrect
  }
  
  return user; // Login successful
}

// Materi service
async function getAllMateri() {
  const result = await pool.query("SELECT * FROM materi ORDER BY id ASC");
  return result.rows;
}

async function getMateriById(id) {
  const result = await pool.query("SELECT * FROM materi WHERE id = $1", [id]);
  return result.rows[0];
}

async function createMateri(data) {
  const { nama_materi, level, deskripsi, jumlah_soal } = data;
  const result = await pool.query(
    "INSERT INTO materi (nama_materi, level, deskripsi, jumlah_soal) VALUES ($1,$2,$3,$4) RETURNING *",
    [nama_materi, level, deskripsi, jumlah_soal]
  );
  return result.rows[0];
}

async function updateMateri(id, data) {
  const { nama_materi, level, deskripsi, jumlah_soal } = data;
  const result = await pool.query(
    `UPDATE materi 
    SET nama_materi = $1, level = $2, deskripsi = $3, jumlah_soal = $4
    WHERE id = $5 
    RETURNING *`,
    [nama_materi, level, deskripsi, jumlah_soal, id]
  );
  return result.rows[0];
}

async function deleteMateri(id) {
  const result = await pool.query(
    "DELETE FROM materi WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

module.exports = {
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
};
