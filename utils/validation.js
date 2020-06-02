const Joi = require("@hapi/joi")

// SIGN UP VALIDATION
const signUpValidation = data => {
  const signUpSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  })

  return signUpSchema.validate(data)
}

// LOGIN VALIDATION
const logInValidation = data => {
  const logInSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  })

  return logInSchema.validate(data)
}

module.exports.signUpValidation = signUpValidation
module.exports.logInValidation = logInValidation
