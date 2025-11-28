// Simple admin check middleware
const eventsService = require("../services/sparkServices");

const isAdmin = async (req, res, next) => {
  try {
    console.log('=== Admin Middleware ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    
    // Ambil email dari header atau body
    const userEmail = req.headers['x-user-email'] || req.body.email;
    console.log('User email:', userEmail);
    
    if (!userEmail) {
      console.log('❌ No email provided');
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Admin access required - no email provided'
      });
    }

    // Cek apakah email ada di table admin
    const admin = await eventsService.getAdminByEmail(userEmail);
    console.log('Admin lookup result:', admin);
    
    if (admin) {
      console.log('✅ Admin verified:', admin.email);
      req.admin = admin; // Simpan data admin di request
      next(); // User adalah admin, lanjutkan
    } else {
      console.log('❌ Admin not found for email:', userEmail);
      res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Admin access required - not an admin'
      });
    }
  } catch (err) {
    console.error('❌ Error in admin middleware:', err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Error verifying admin access: ' + err.message
    });
  }
};

module.exports = { isAdmin };
