const db = require('../../db')

const fetchIncidents = async() => {
	const feed = await db.query(
		`SELECT * 
		 FROM incident_report;`
	)
	return feed.rows
}

module.exports = fetchIncidents