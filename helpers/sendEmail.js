const sgMail = require('@sendgrid/mail')
// eslint-disable-next-line no-unused-expressions
require('dotenv').config

const { SENDGRID_KEY } = process.env
sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async(data) => {
  const email = { ...data, from: 'olechka.moiseenko@gmail.com' }

  await sgMail.send(email)
}

module.exports = sendEmail
