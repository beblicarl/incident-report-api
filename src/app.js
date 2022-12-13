const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')
const globalErrorHandler = require('./middleware/global-errorhandler')


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
	const error = new Error(`Cannot find the request url ${req.originalUrl}`)
	error.status = 404
	next(error)
})

app.use(globalErrorHandler)

module.exports = app
