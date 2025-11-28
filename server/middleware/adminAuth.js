// Simple admin check middleware
const eventsService = require("../services/sparkServices");

const isAdmin = async (req, res, next) => {
  try {
    // Ambil email dari header atau body
    const userEmail = req.headers['x-user-email'] || req.body.email;
    
    if (!userEmail) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Admin access required - no email provided'
      });
    }

    // Cek apakah email ada di table admin
    const admin = await eventsService.getAdminByEmail(userEmail);
    
    if (admin) {
      req.admin = admin; // Simpan data admin di request
      next(); // User adalah admin, lanjutkan
    } else {
      res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Admin access required'
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Error verifying admin access'
    });
  }
};

module.exports = { isAdmin };
