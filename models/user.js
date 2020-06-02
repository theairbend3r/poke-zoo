const mongoose = require("mongoose")

const collectionSchema = mongoose.Schema({
  collectionName: {
    type: String,
    unique: true,
    required: true,
  },
  pokemons: [],
})

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
      min: 6,
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
