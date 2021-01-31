const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const config = require('../config');

const wrap = res => JSON.stringify(res)

router.post('/', (req, res) => {
  const error = new Error()

  !req.body.name && (error.message = 'name is required')
  !req.body.email && (error.email = 'email is required')
  !req.body.message && (error.message = 'message is required')

  if (error.message) {
    error.status = 400

    return res.end(wrap(error))
  }

  const transporter = nodeMailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: `${req.body.message.trim().slice(0, 500)} \n Імейл потенційного качєлі: <${req.body.email}>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      const e = new Error()

      e.message = error.message
      e.status = 500

      return res.end(wrap(e))
    }

    return res.end(wrap(info))
  });
});

module.exports = router;