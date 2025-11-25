const eventsService = require("../services/sparkServices");

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
        nama_user: user.name_user,
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
