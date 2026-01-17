/**
 * 🛡️ Role-based access control middleware
 * @param  {...String} roles - allowed roles
 */
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user is already attached by auth middleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied for role: ${req.user.role}`,
      });
    }

    next();
  };
};
