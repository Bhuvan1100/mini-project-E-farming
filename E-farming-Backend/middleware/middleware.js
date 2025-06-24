const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;



function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ status: false, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
}

module.exports = authenticateToken;
