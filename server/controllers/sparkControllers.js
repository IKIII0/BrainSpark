const eventsService = require("../services/sparkServices");
const { isAdmin } = require("../middleware/adminAuth");

// ADMIN CONTROLLERS
async function getAllAdmins(req, res) {
  try {
    const admins = await eventsService.getAllAdmins();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Admins retrieved successfully",
      data: admins,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function createAdmin(req, res) {
  try {
    const newAdmin = await eventsService.createAdmin(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Admin created successfully",
      data: newAdmin,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

// USERS CONTROLLERS
async function getAllUsers(req, res) {
  try {
    const users = await eventsService.getAllUsers();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const user = await eventsService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    if (Object.keys(req.body).length === 2 && email && password) {
      const user = await eventsService.login(email, password);

      if (!user) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Invalid email or password",
        });
      }

      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Login successful",
        data: {
          id: user.id,
          email: user.email_user,
          nama_user: user.nama_user,
          nim: user.nim,
          universitas: user.universitas,
          no_hp: user.no_hp,
        },
      });
    }

    // Otherwise, create new user
    const newUser = await eventsService.createUser(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await eventsService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await eventsService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email_user, pass } = req.body;
    const result = await eventsService.login(email_user, pass);

    if (!result) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Invalid email or password",
      });
    }

    // Jika admin
    if (result.isAdmin) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Admin login successful",
        data: {
          email: result.email,
          nama: result.name,
          isAdmin: true,
        },
      });
    }

    // Jika user biasa
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Login successful",
      data: {
        id: result.id,
        email: result.email_user,
        nama_user: result.nama_user,
        nim: result.nim,
        universitas: result.universitas,
        no_hp: result.no_hp,
        isAdmin: false,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

// MATERI CONTROLLERS
async function getAllMateri(req, res) {
  try {
    const materi = await eventsService.getAllMateri();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Materi retrieved successfully",
      data: materi,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function getMateriById(req, res) {
  try {
    const materi = await eventsService.getMateriById(req.params.id);
    if (!materi) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Materi not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Materi retrieved successfully",
      data: materi,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function createMateri(req, res) {
  try {
    console.log("=== Create Materi Controller ===");
    console.log("Request body:", req.body);
    console.log("Admin from middleware:", req.admin);

    // Admin sudah diverifikasi oleh middleware isAdmin
    const newMateri = await eventsService.createMateri(req.body);
    console.log("✅ Materi created:", newMateri);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Materi created successfully",
      data: newMateri,
    });
  } catch (err) {
    console.error("❌ Error creating materi:", err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function updateMateri(req, res) {
  try {
    const updatedMateri = await eventsService.updateMateri(
      req.params.id,
      req.body
    );
    if (!updatedMateri) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Materi not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Materi updated successfully",
      data: updatedMateri,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

async function deleteMateri(req, res) {
  try {
    // Admin sudah diverifikasi oleh middleware isAdmin
    const deletedMateri = await eventsService.deleteMateri(req.params.id);
    if (!deletedMateri) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Materi not found",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Materi deleted successfully",
      data: deletedMateri,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message,
    });
  }
}

// Ambil semua quiz
async function getAllQuiz(req, res) {
  try {
    const quiz = await eventsService.getAllQuiz();
    res.json({
      status: "success",
      data: quiz
    });
  } catch (error) {
    console.error("Error getAllQuiz:", error);
    res.status(500).json({ 
      status: "error",
      message: "Internal server error" 
    });
  }
}

// Ambil quiz berdasarkan materi_id
async function getQuizByMateriId(req, res) {
  try {
    const { id } = req.params;
    const quiz = await eventsService.getQuizByMateriId(id);
    res.json({
      status: "success",
      data: quiz
    });
  } catch (error) {
    console.error("Error getQuizByMateriId:", error);
    res.status(500).json({ 
      status: "error",
      message: "Internal server error" 
    });
  }
}

// Tambah quiz baru
async function createQuiz(req, res) {
  try {
    const newQuiz = await eventsService.createQuiz(req.body);
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error createQuiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update quiz
async function updateQuiz(req, res) {
  try {
    const { id } = req.params;
    const updatedQuiz = await eventsService.updateQuiz(id, req.body);
    res.json(updatedQuiz);
  } catch (error) {
    console.error("Error updateQuiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Hapus quiz
async function deleteQuiz(req, res) {
  try {
    const { id } = req.params;
    const deletedQuiz = await eventsService.deleteQuiz(id);
    res.json(deletedQuiz);
  } catch (error) {
    console.error("Error deleteQuiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
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
  getAllQuiz,
  getQuizByMateriId,
  createQuiz, 
  updateQuiz,
  deleteQuiz,
};
