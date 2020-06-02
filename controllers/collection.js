const collectionRouter = require("express").Router()
const verify = require("./verifyToken")

const User = require("../models/user")

//  CREATE COLLECTION
collectionRouter.post("/create", verify, async (req, res) => {
  const body = req.body

  // Find relevant document based on username.
  const user = await User.findOne({ username: body.username })
  // If no document is found based on username, return 400.
  if (!user) {
    console.log(body)
    return res.status(400).json({ msg: "Could not find the user." })
  }

  // create a new collection
  const newCollection = {
    collectionName: body.collectionName,
    pokemons: body.pokemons,
  }

  // Add collection to the document.
  user.pokeCollection.push(newCollection)

  // Save document
  try {
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } catch (e) {
    res.status(400).json({ msg: e })
  }
})

// DISPLAY COLLECTION
collectionRouter.get("/display/:username", verify, async (req, res) => {
  const username = req.params.username

  // Find relevant document based on username.
  const user = await User.findOne({ username: username })
  // If no document is found based on username, return 400.
  if (!user) {
    console.log(body)
    return res.status(400).json({ msg: "Could not find the user." })
  }

  const collection = user.pokeCollection

  try {
    res.status(200).json(collection)
  } catch (e) {
    res.status(400).json({ msg: e })
  }
})

//  ADD POKEMON TO COLLECTION
collectionRouter.post("/addpoke", verify, async (req, res) => {
  const body = req.body

  // Find relevant document based on username.
  const user = await User.findOne({ username: body.username })

  // If no document is found based on username, return 400.
  if (!user) return res.status(400).json({ msg: "Could not find the user." })

  // Find the subdocument based on collection id.
  const collection = user.pokeCollection.find(
    col => col.collectionId === body.collectionId
  )
  // If not subdoc (based on collection id) is found, return 400,
  if (!collection) return res.status(400).json({ msg: "Collection not found." })

  // Add pokemon to collection.
  collection.pokemons.push(body.pokemon)

  // Save document
  try {
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } catch (e) {
    res.status(400).json({ msg: e })
  }
})

module.exports = collectionRouter
