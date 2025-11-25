const pool = require("../config/db");

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
  const { name_user, email_user, pass, nim, universitas, no_hp } = data;
  const result = await pool.query(
    "INSERT INTO users (name_user, email_user, pass, nim, universitas, no_hp) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [name_user, email_user, pass, nim, universitas, no_hp]
  );
  return result.rows[0];
}

async function updateUser(id, data) {
  const { name_user, email_user, pass, nim, universitas, no_hp } = data;
  const result = await pool.query(
    `UPDATE users 
    SET name_user = $1, email_user = $2, pass = $3, nim = $4, universitas = $5, no_hp = $6
    WHERE id = $7 
    RETURNING *`,
    [name_user, email_user, pass, nim, universitas, no_hp, id]
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
  const result = await pool.query(
    "SELECT * FROM users WHERE email_user = $1 AND pass = $2",
    [email, password]
  );
  return result.rows[0];
}

// Materi service
async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
  return result.rows;
}

async function getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

async function createUser(data) {
  const { name_user, email_user, pass, nim, universitas, no_hp } = data;
  const result = await pool.query(
    "INSERT INTO users (name_user, email_user, pass, nim, universitas, no_hp) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [name_user, email_user, pass, nim, universitas, no_hp]
  );
  return result.rows[0];
}

async function updateUser(id, data) {
  const { name_user, email_user, pass, nim, universitas, no_hp } = data;
  const result = await pool.query(
    `UPDATE users 
    SET name_user = $1, email_user = $2, pass = $3, nim = $4, universitas = $5, no_hp = $6
    WHERE id = $7 
    RETURNING *`,
    [name_user, email_user, pass, nim, universitas, no_hp, id]
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
