// Simple admin check middleware
// Admin is identified by email: admin@brainspark.com

const isAdmin = (req, res, next) => {
  // For now, we'll check if user is admin based on email
  // In a real app, you'd use JWT or session-based auth
  const adminEmail = 'admin@brainspark.com';
  
  // Check if the request is from admin (you can pass admin email in headers or use auth token)
  const userEmail = req.headers['x-user-email'] || req.body.email_user;
  
  if (userEmail === adminEmail) {
    next(); // User is admin, proceed
  } else {
    res.status(403).json({
      status: 'error',
      code: 403,
      message: 'Admin access required'
    });
  }
};

module.exports = { isAdmin };
