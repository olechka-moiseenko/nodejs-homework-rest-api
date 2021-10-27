const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const gravatar = require('gravatar')

const signup = async(req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already signup')
  }
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, subscription, avatarURL })
  newUser.setPassword(password)
  await newUser.save()
  sendSuccessRes(res, null, 201)
}

module.exports = signup
