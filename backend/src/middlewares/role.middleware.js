const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Safety check (auth middleware must run first)
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Role-based access check
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = authorize;
