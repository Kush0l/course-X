const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { adminMiddleware };