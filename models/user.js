const mongoose = require("mongoose")

const pokeSchema = mongoose.Schema({
  pokeName: {
    type: String,
    unique: true,
    required: true,
  },
  pokeUrl: {
    type: String,
    unique: true,
    required: true,
  },
  pokeType: {
    type: String,
    required: true,
  },
  pokeHeight: {
    type: Number,
    required: true,
  },
  pokeWeight: {
    type: Number,
    required: true,
  },
})

const collectionSchema = mongoose.Schema(
  {
    collectionId: {
      type: String,
      unique: true,
      required: true,
    },
    collectionName: {
      type: String,
      unique: true,
      required: true,
    },
    pokemons: [pokeSchema],
  },
  { timestamps: true }
)

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    pokeCollection: [collectionSchema],
  },
  { timestamps: true }
)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model("User", userSchema)
