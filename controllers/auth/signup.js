const gravatar = require('gravatar')
const { User } = require('../../models')
const { v4 } = require('uuid')

const { Conflict } = require('http-errors')
const { sendEmail } = require('../../helpers')

const signup = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already signup')
  }

  const verifyToken = v4()

  const newUser = new User({ email, verifyToken })
  newUser.setPassword(password)
  newUser.avatarURL = gravatar.url(email)

  await newUser.save()

  const data = {
    to: email,
    subject: 'Registration confirmation',
    html: `<p>Please confirm your email
    <a href="http://localhost:3000/api/v1/auth/users/verify/${verifyToken}" target="_blank"><b>here</b></a></p>`
  }

  await sendEmail(data)

  res.status(201).json({
    status: 200,
    message: 'Succes register',
    data: {
      verifyToken,
    }
  })
}

module.exports = signup
