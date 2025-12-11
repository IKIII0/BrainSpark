const pool = require("../config/db");
const passwordUtils = require("../utils/passwordUtils");

// Admin Services
async function getAllAdmins() {
  const result = await pool.query(
    "SELECT * FROM admin ORDER BY nama_admin ASC"
  );
  return result.rows;
}

async function getAdminByEmail(email) {
  const result = await pool.query("SELECT * FROM admin WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

async function createAdmin(data) {
  const { nama_admin, email, pass } = data;

  // Hash password before saving
  const hashedPassword = await passwordUtils.hashPassword(pass);

  const result = await pool.query(
    "INSERT INTO admin (nama_admin, email, pass) VALUES ($1, $2, $3) RETURNING *",
    [nama_admin, email, hashedPassword]
  );
  return result.rows[0];
}

async function loginAdmin(email, pass) {
  const admin = await getAdminByEmail(email);
  if (!admin) {
    return null;
  }

  const isPasswordValid = await passwordUtils.verifyPassword(pass, admin.pass);
  if (!isPasswordValid) {
    return null;
  }

  return admin;
}

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

async function getUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email_user = $1",
    [email]
  );
  return result.rows[0];
}

async function createUserFromGoogle({ email, name }) {
  const result = await pool.query(
    "INSERT INTO users (nama_user, email_user, pass, nim, universitas, no_hp) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    // User dari Google: password dummy, kolom lain dibiarkan NULL
    [name, email, "google-auth", null, null, null]
  );
  return result.rows[0];
}

// Di sparkServices.js - Ganti function login dengan ini:
async function login(email, password) {
  console.log("Login attempt for email:", email);

  try {
    // Cek admin
    const adminResult = await pool.query(
      "SELECT email, pass, nama_admin FROM admin WHERE email = $1",
      [email]
    );

    if (adminResult.rows.length > 0) {
      const admin = adminResult.rows[0];
      const isPasswordValid = await passwordUtils.verifyPassword(
        password,
        admin.pass
      );

      if (isPasswordValid) {
        console.log("✅ Admin login successful");
        return {
          email: admin.email,
          name: admin.nama_admin,
          isAdmin: true,
        };
      }
    }

    // Jika bukan admin, cek user biasa
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email_user = $1",
      [email]
    );

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      const isPasswordValid = await passwordUtils.verifyPassword(
        password,
        user.pass
      );

      if (isPasswordValid) {
        console.log("✅ User login successful");
        return {
          ...user,
          isAdmin: false,
        };
      }
    }

    console.log("❌ Invalid credentials for:", email);
    return null;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
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

// Ambil semua quiz
async function getAllQuiz() {
  const result = await pool.query("SELECT * FROM quiz ORDER BY id ASC");
  return result.rows;
}

// Ambil quiz berdasarkan materi_id
async function getQuizByMateriId(materiId) {
  const result = await pool.query(
    "SELECT * FROM quiz WHERE materi_id = $1 ORDER BY id ASC",
    [materiId]
  );
  return result.rows;
}

// Tambah soal quiz
async function createQuiz(data) {
  const { materi_id, question, options, correct_answer } = data;
  const result = await pool.query(
    "INSERT INTO quiz (materi_id, question, options, correct_answer) VALUES ($1,$2,$3,$4) RETURNING *",
    [materi_id, question, options, correct_answer]
  );
  return result.rows[0];
}

// Update soal quiz
async function updateQuiz(id, data) {
  const { question, options, correct_answer } = data;
  const result = await pool.query(
    `UPDATE quiz 
     SET question = $1, options = $2, correct_answer = $3
     WHERE id = $4 RETURNING *`,
    [question, options, correct_answer, id]
  );
  return result.rows[0];
}

// Hapus soal quiz
async function deleteQuiz(id) {
  const result = await pool.query(
    "DELETE FROM quiz WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

// Activity logs service
async function createActivityLog({ admin_email, admin_name, action, entity_type, entity_id, description }) {
  await pool.query(
    `INSERT INTO activity_logs 
      (admin_email, admin_name, action, entity_type, entity_id, description)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [admin_email, admin_name, action, entity_type, entity_id, description]
  );
}

async function getActivityLogs(limit = 100) {
  const result = await pool.query(
    `SELECT * FROM activity_logs
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit]
  );
  return result.rows;
}

module.exports = {
  // Admin services
  getAllAdmins,
  getAdminByEmail,
  createAdmin,
  loginAdmin,

  // User services
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  createUserFromGoogle,
  login,

  // Materi services
  getAllMateri,
  getMateriById,
  createMateri,
  updateMateri,
  deleteMateri,

  // Quiz services
  getAllQuiz,
  getQuizByMateriId,
  createQuiz,
  updateQuiz,
  deleteQuiz,

  // Activity logs
  createActivityLog,
  getActivityLogs,
};
