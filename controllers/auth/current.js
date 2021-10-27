const { User } = require('../../models')
const { Unauthorized } = require('http-errors')

const current = async (req, res) => {
  try {
    const { _id } = req.user
    const user = await User.findById(_id, '_id email subscription avatarURL')
    console.log(user)
    if (user) {
      res.json({
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL
      })
    }
  } catch (error) {
    throw new Unauthorized('Not authorized')
  }
}

module.exports = current
