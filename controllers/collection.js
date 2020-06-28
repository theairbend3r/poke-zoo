const collectionRouter = require("express").Router()
const verify = require("./verifyToken")

const User = require("../models/user")

//  CREATE COLLECTION
collectionRouter.post("/create", verify, async (req, res) => {
  const body = req.body

  if (body.collectionName === "")
    return res.status(400).json({
      msg: "Collection cannot be blank. Please choose another name.",
    })

  // Find relevant document based on username.
  const user = await User.findOne({ username: body.username })
  // If no document is found based on username, return 400.
  if (!user) {
    return res.status(400).json({ msg: "Could not find the user." })
  }

  collectionNameExists = user.pokeCollection.find(
    x => x.collectionName === body.collectionName
  )

  if (collectionNameExists)
    return res.status(400).json({
      msg: "Collection Name already exists. Please choose another name.",
    })

  // create a new collection
  const newCollection = {
    collectionId: body.collectionId,
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
    return res.status(400).json({ msg: "Could not find the user." })
  }

  const collection = user.pokeCollection

  try {
    res.status(200).json(collection)
  } catch (e) {
    res.status(400).json({ msg: e })
  }
})

// DELETE COLLECTION
collectionRouter.post("/delete", verify, async (req, res) => {
  const body = req.body

  // Find relevant document based on username.
  const user = await User.findOne({ username: body.username })
  // If no document is found based on username, return 400.
  if (!user) {
    return res.status(400).json({ msg: "Could not find the user." })
  }

  user.pokeCollection = user.pokeCollection.filter(
    col => col.collectionId !== body.collectionId
  )

  // Save document
  try {
    const updatedUser = await user.save()
    res.status(200).json({ collectionId: body.collectionId })
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

  if (collection.pokemons.length !== 0) {
    // Check if Pokemon already exists in collection
    pokemonExists = collection.pokemons.find(
      poke => poke.pokeName === body.pokemon.pokeName
    )

    if (pokemonExists)
      return res.status(400).json({
        msg:
          "Pokemon already exists in collection. Please choose another pokemon.",
      })
  }

  // Add pokemon to collection.
  collection.pokemons.push({
    pokeName: body.pokemon.pokeName,
    pokeUrl: body.pokemon.pokeUrl,
    pokeType: body.pokemon.pokeType,
    pokeHeight: body.pokemon.pokeHeight,
    pokeWeight: body.pokemon.pokeWeight,
  })

  // Save document
  try {
    const updatedUser = await user.save()
    const returnObj = {
      pokeName: body.pokemon.pokeName,
      pokeUrl: body.pokemon.pokeUrl,
      pokeType: body.pokemon.pokeType,
      collectionId: body.collectionId,
    }
    res.status(200).json(returnObj)
  } catch (e) {
    res.status(400).json({ msg: e })
  }
})

//  EDIT COLLECTION
collectionRouter.post("/editcollection", verify, async (req, res) => {
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

  // Rename collection
  collection.collectionName = body.newCollectionName

  // Update pokemons in the collection
  console.log(body.editedPokemonList)
  collection.pokemons = body.editedPokemonList

  // Save document
  try {
    const updatedUser = await user.save()
    const returnObj = {
      collectionName: body.newCollectionName,
      collectionId: body.collectionId,
      pokemonList: body.editedPokemonList,
    }
    res.status(200).json(returnObj)
  } catch (e) {
    res.status(400).json({ msg: e })
  }
})

module.exports = collectionRouter
