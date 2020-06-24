const path = require("path")
const config = require("./utils/config")
const logger = require("./utils/logger")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const authRouter = require("./controllers/auth")
const collectionRouter = require("./controllers/collection")

// Connect to MongoDB
logger.info("Connecting to MongoDB...")

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB.")
  })
  .catch(error => {
    logger.error("Error connection to MongoDB:", error.message)
  })

// User Middleware
app.use(cors())
app.use(express.static("build"))
app.use(express.json())

// Routes
app.use("/api/auth", authRouter)
app.use("/api/collection", collectionRouter)

app.use(
  "/api/pokeml/classify",
  express.static(path.join(__dirname, "classifier_models/original/model.json"))
)

app.use(
  "/api/pokeml",
  express.static(path.join(__dirname, "classifier_models/original"))
)

module.exports = app
