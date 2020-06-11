const authRouter = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")
const config = require("../utils/config")

const { signUpValidation, logInValidation } = require("../utils/validation")

// SIGN UP
authRouter.post("/signup", async (req, res) => {
  const body = req.body

  // Validation.
  const { error } = signUpValidation(body)
  if (error) return res.status(400).json({ msg: error.details })

  // Check if username already exists in db.
  const usernameExists = await User.findOne({ username: body.username })
  if (usernameExists)
    return res
      .status(400)
      .json({ msg: [{ message: "Username already exists." }] })

  // Hash password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  // If all checks pass, we create a new user.
  const newUser = new User({
    username: body.username,
    password: passwordHash,
  })

  // Create JWT
  const token = jwt.sign({ id: newUser.id }, config.JWT_SECRET, {
    expiresIn: 60 * 60 * 1, // expires in 1 hour
  })

  try {
    const savedUser = await newUser.save()
    res
      .header("auth-token", token)
      .json({ token: token, username: body.username })
  } catch (e) {
    res.status(400).json({ msg: e })
  }
})

// LOGIN
authRouter.post("/login", async (req, res) => {
  const body = req.body

  // Validation.
  const { error } = logInValidation(body)
  if (error) return res.status(400).json({ msg: error.details })

  // Check if username already exists in db.
  const user = await User.findOne({ username: body.username })
  if (!user)
    return res.status(400).json({ msg: "Username or Password is incorrect." })

  // Check if password is correct
  const validatePassword = await bcrypt.compare(body.password, user.password)
  if (!validatePassword)
    return res.status(400).json({ msg: "Username or Password is incorrect." })

  // Create JWT
  const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
    expiresIn: 60 * 60 * 1, // expires in 1 hour
  })

  try {
    res
      .header("auth-token", token)
      .json({ token: token, username: body.username })
  } catch (e) {
    res.status(400).json({ msg: e })
  }
})

// AUTO LOGIN ON BROWSER REFRESH
authRouter.get("/autologin", async (req, res) => {
  const token = req.header("auth-token")

  // Check if token exists
  if (!token) return res.status(401).json({ msg: "Access Denied." })

  try {
    const verified = jwt.verify(token, config.JWT_SECRET)
    userId = verified.id

    const user = await User.findOne({ _id: userId })
    if (!user)
      return res.status(400).json({ msg: "Username or Password is incorrect." })

    res.status(200).json({ username: user.username, token: token })
  } catch (e) {
    res.status(400).json({ msg: "Invalid Token." })
  }
})

module.exports = authRouter
