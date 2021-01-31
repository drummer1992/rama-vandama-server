const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config.js')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', require('./routes/index'))

app.use((req, res) => {
  const err = new Error()

  err.status = 404
  err.message = 'Not found'

  res.end(JSON.stringify(err))
})

const server = app.listen(config.server.port, () => {
  console.log(`Server started on port: ${server.address().port}`)
})