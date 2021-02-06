const express = require('express')
const router = express.Router()
const nodeMailer = require('nodemailer')
const config = require('../config')

const wrap = res => JSON.stringify(res)

router.post('/', (req, res) => {
  const error = new Error()

  const { name, email, message, phone, schedule } = req.body

  !name && (error.message = 'name is required');
  (!email && !phone) && (error.message = 'email or phone is required')
  !message && (error.message = 'message is required')

  if (error.message) {
    error.status = 400

    return res.end(wrap(error))
  }

  const defaultMsg = 'Не заповнив падла 💩'

  const transporter = nodeMailer.createTransport(config.mail.smtp)
  const mailOptions = {
    from   : `"${name}" <${email}>`,
    to     : config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text   : `${message.trim().slice(0, 500)}
        \n Імейл потенційного качєлі: ${email ? `<${email}>` : defaultMsg}
        \n Телефон потенційного качєлі: ${phone || defaultMsg} 
        \n Качєлін розклад: ${schedule || defaultMsg}
`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      const e = new Error()

      e.message = error.message
      e.status = 500

      return res.end(wrap(e))
    }

    return res.end(wrap(info))
  })
})

module.exports = router