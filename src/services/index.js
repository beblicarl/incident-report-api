/* eslint-disable max-len */
const axios = require('axios')
const db = require('../db')
require('dotenv').config()
const customError = require('../lib/custom-error')


let weatherReport
const createReport = async({incident, country, city}) => {
	try {
		const response  = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`)
		const {data} = response
		const {lat , lon} = data[0]
        

		const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`)
		weatherReport = result.data
		
	} catch (error) {
		console.log(error)
		throw customError(error)
	}
	
	
	const newReport = await db.query(
		`INSERT INTO incident_report
		 (incident_desc, city, country, weather_report )
		  VALUES ($1 , $2 , $3 , $4 ) 
		  RETURNING client_id, incident_desc, city, country , date , 
          weather_report content`,
		[incident, city, country, weatherReport]
	)
	return newReport.rows[0]
}

const fetchIncidents = async() => {
	const feed = await db.query(
		`SELECT * FROM incident_report;`
	)
	return feed.rows
}

module.exports = {
	createReport,
	fetchIncidents
}