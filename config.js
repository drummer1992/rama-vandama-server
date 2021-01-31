require('dotenv').config()

module.exports = {
  "mail"  : {
    "subject": "Rama Вандама",
    "smtp"   : {
      "host"  : "smtp.gmail.com",
      "port"  : 465,
      "secure": true,
      "auth"  : {
        "user": process.env.GMAIL_USER,
        "pass": process.env.GMAIL_PASSWORD,
      }
    }
  },
  "server": {
    "port": process.env.PORT
  }
}