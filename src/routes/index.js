const express = require('express')

const incident = require('./incident')

const app = express.Router()

app.use('/incident', incident)

module.exports = app