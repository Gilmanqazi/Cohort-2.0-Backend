const jwt = require("jsonwebtoken");
const redis  = require("../config/cache")

async function authUser(req, res, next) {
  const token = req.cookies.token;

  // 1. Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const isTokenBlacklisted = await redis.get(token)

  if (isTokenBlacklisted) {
      return res.status(401).json({
          message: "Invalid token"
      })
  }

  try {
      const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET,
      )

      req.user = decoded

      next()
  } catch (err) {
      return res.status(401).json({
          message: "Invalid token"
      })
  }
}


module.exports = authUser;