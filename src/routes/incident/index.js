const express = require('express')
const reportService = require('../../services')

const {
	incidentReportSchema
} = require('../../schema')
const { 
	CountryOrCityDoesNotExistOrCityIsNotLocatedInTheCountryError 
} = require('../../services/error')


const validateSchema = require('../../middleware/validateSchema')
const { 
	logger,
	AppError
} = require('../../lib')


const ERROR_MAP = {
	[CountryOrCityDoesNotExistOrCityIsNotLocatedInTheCountryError.name] : 404
	
}
const log = logger()
const router = express.Router()

const createIncidentReport =  async (req, res, next) => {
	
	try {
		const { incidentDescription, country, city } = req.body
		const newReport = await reportService.createReport({
			incidentDescription,
			country, 
			city
		})
		res.status(201).json({
			status: 'success',
			data: {
				message: 'Incident report successfully posted',
				clientId : newReport.client_id,
				incidentDescription: newReport.incident_desc,
				city: newReport.city,
				country: newReport.country,
				weatherReport: newReport.weather_report
			}
		})
	} catch (error) {
		log.error(error.message)
		next(error)
	}

}

const fetchIncidents =  async(req, res, next) => {
	try {
		const feed = await reportService.fetchIncidents()

		res.status(200).json({
			status: 'success',
			data: feed.map((incident) => ({
				clientId : incident.client_id,
				incidentDescription : incident.incident_desc,
				city: incident.city,
				country: incident.country,
				date: incident.date,
				weatherReport: incident.weather_report

			})
			)
		})
	} catch (error) {
		log.error(error.message)
		next(error)
	}
	
	
}


router
	.route('/')
	.get(fetchIncidents)
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