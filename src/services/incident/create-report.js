/* eslint-disable max-len */
const axios = require('axios')
const db = require('../../db')

const { 
	customError
} = require('../../lib')

const {
	IncidentReportDoesNotExistError
} = require('../error')

let weatherReport
const createReport = async({incidentDescription, country, city}) => {
	
	const response  = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`)
	const {data} = response
	if( data.length === 0){
		throw customError(IncidentReportDoesNotExistError)
	}
	const {lat , lon} = data[0]
        

	const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`)
	weatherReport = result.data
		

	const newReport = await db.query(
		`INSERT INTO incident_report
		 (incident_desc, city, country, weather_report )
		  VALUES ($1 , $2 , $3 , $4 ) 
		  RETURNING client_id, incident_desc, city, country , date , 
          weather_report`,
		[incidentDescription, city, country, weatherReport]
	)
	return newReport.rows[0]
}

module.exports = createReport