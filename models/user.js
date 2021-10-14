const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jwt')

const { SECRET_KEY } = process.env

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null
  }
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.createToken = function() {
  const payload = {
    _id: this._id
  }
  return jwt.sign(payload, SECRET_KEY)
}

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.srting().min(6).required()
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
}