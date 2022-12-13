const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')
const { AppError } = require('./lib')

const router = require('./routes/index')

const file = fs.readFileSync('./docs/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

const app = express()


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.get('/api/v1/health', (req, res) => {
	res.send('Health is ok!')
})

// Routes
app.use('/api/v1', router)

app.all('*', (req, res, next) => {
	const err = new AppError(
		`Cannot find the requested url ${req.originalUrl}`,
		404
	)
	next(err)
})

module.exports = app
