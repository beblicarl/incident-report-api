/* eslint-disable camelcase */
const express = require('express')
const reportService = require('../../services')

const {
	incidentReportSchema
} = require('../../schema')
const { 
	IncidentReportDoesNotExistError 
} = require('../../services/error')


const validateSchema = require('../../middleware/validateSchema')
const { 
	catchAsync,
	AppError
} = require('../../lib')


const ERROR_MAP = {
	[IncidentReportDoesNotExistError.name] : 404
	
}

const router = express.Router()

const createIncidentReport = catchAsync( async (req, res) => {
	
	
	const { incident, country, city } = req.body
	const newReport = await reportService.createReport({
		incident,
		country, 
		city
	})
	res.status(201).json({
		status: 'success',
		data: {
			message: 'Incident report successfully posted',
			clientId : newReport.client_id,
			incident: newReport.incident_desc,
			city: newReport.city,
			country: newReport.country,
			weatherReport: newReport.content
		}
	})
	
})

router
	.route('/')
	.post( validateSchema(incidentReportSchema), createIncidentReport)

router
	.use((err, req, res, next)=> {
		const error = err
		error.success = false
		if(ERROR_MAP[error.name] ){
			next(new AppError( error.message ,ERROR_MAP[error.name] ))
		
		} 
		next(err)
	})

module.exports = router