const eventsService = require("../services/sparkServices");

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
        message: "Event not found",
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
    const { email, password } = req.body;
    const user = await eventsService.login(email, password);

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
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
    const newMateri = await eventsService.createMateri(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Materi created successfully",
      data: newMateri,
    });
  } catch (err) {
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
