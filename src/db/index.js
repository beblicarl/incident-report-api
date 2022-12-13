/* eslint-disable no-console */
const { Pool } = require('pg')
require('dotenv').config()
// const logger = require('../lib/logger')

// const log = logger()
console.log(process.env.DATABASE_URL)
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})
console.log('database successfully connected')
module.exports = {
	async query(text, params) {
		const res = await pool.query(text, params)
		return res
	}
}
