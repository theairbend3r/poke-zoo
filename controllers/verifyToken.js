const jwt = require("jsonwebtoken")
const config = require("../utils/config")

function auth(req, res, next) {
  const token = req.header("auth-token")

  // Check if token exists
  if (!token) return res.status(401).json({ msg: "Access Denied." })

  try {
    const verified = jwt.verify(token, config.JWT_SECRET)
    req.user = verified
    next()
  } catch (e) {
    res.status(400).json({ msg: "Invalid Token." })
  }
}

module.exports = auth
