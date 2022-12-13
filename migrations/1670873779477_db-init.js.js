/* eslint-disable camelcase */
const { PgLiteral } = require('node-pg-migrate')

exports.shorthands = {
	date_time: {
		type: 'date',
		notNull: true,
		default: new PgLiteral('current_date')
	}
}

exports.up = (pgm) => {
	pgm.createTable('incident_report', {
		client_id: 'id',
		incident_desc: { type: 'varchar(1000)', notNull: true },
		city: { type: 'varchar(100)', notNull: true },
		country: { type: 'varchar(100)', notNull: true },
		date: 'date_time',
		weather_report: { type: 'json', notNull: true }
	})

}

exports.down = false
