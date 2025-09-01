const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Token is not valid" });
  }
};