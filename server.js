require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const api_routes = require('./api_routes')
const port = process.env.API_PORT || 5000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api_routes)

app.listen(port, () => console.log(`Listening on port ${process.env.API_PORT}`))