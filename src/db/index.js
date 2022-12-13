const { Pool } = require('pg')
require('dotenv').config()
const { logger } = require('../lib')

const log = logger()

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})
log.success('database successfully connected')
module.exports = {
	async query(text, params) {
		const res = await pool.query(text, params)
		return res
	}
}
