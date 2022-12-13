/* eslint-disable no-console */
const app = require('./app')
// const { logger } = require('./lib/index')

// const log = logger()

process.on('uncaughtExceptions', (err) => {
	console.error(err.stack)
	console.error('Uncaught Exceptions! Shutting down...')
	process.exit(1)
})

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
	console.info(`App running on port ${port}...`)
})

process.on('unhandledRejection', (err) => {
	console.error(err.stack)
	console.error('Unhandled Rejection! Shutting down...')
	server.close(() => {
		process.exit(1)
	})
})
