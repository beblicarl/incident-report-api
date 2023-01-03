/* eslint-disable max-len */
const axios = require('axios')
const db = require('../db')

const { 
	customError
} = require('../lib')

const {
	CountryOrCityDoesNotExistOrCityIsNotLocatedInTheCountryError  
} = require('./error')

let weatherReport
const createReport = async({incidentDescription, country, city}) => {
	
	const response  = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${city}%20${country}&apiKey=${process.env.GEOCODING_API}`, { 
		headers: { "Accept-Encoding": "gzip,deflate,compress" } 
	})
	
	const data = response.data.features[0].properties
	
	if( data.country === undefined || data.city === undefined){
		throw customError(CountryOrCityDoesNotExistOrCityIsNotLocatedInTheCountryError)
	}
	else{
		const {lat , lon} = data    

		const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`, { 
			headers: { "Accept-Encoding": "gzip,deflate,compress" } 
		})
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
}


const fetchIncidents = async() => {
	const feed = await db.query(
		`SELECT * 
		 FROM incident_report;`
	)
	return feed.rows
}

module.exports = {
	createReport,
	fetchIncidents
}