const checkAllowedRoles = (allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.userPayload;
    const hasAllowedRoles = allowedRoles.some((roles) => roles.includes(role));

    if (hasAllowedRoles) {
      next();
    } else {
      res.status(403).json({
        msg: "Access denied",
      });
    }
  };
};

module.exports = checkAllowedRoles;
