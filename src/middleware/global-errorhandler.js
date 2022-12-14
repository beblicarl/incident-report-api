const { logger } = require('../lib')

const log = logger()

const sendError = (error, res) => {
	if (error.isOperational) {
		res.status(error.statusCode).json({
			status: error.status,
			message: error.message
		})
	} else {
		// handle programming or unknown errors to clients
		log.error(error)
		res.status(500).json({
			status: 'internal server error',
			message: 'Something went wrong!'
		})
	}
}

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
	
	sendError(error, res)
}