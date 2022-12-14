const { default: pgMigrate} = require('node-pg-migrate')
const request = require('supertest')
const path = require('path')
// const { faker } = require('@faker-js/faker')
const db = require('../src/db')
const app = require('../src/app')


const tearDown = () => 
	db.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;")

const resetDBTable = (table) =>
	 db.query(`
		TRUNCATE ${table} CASCADE;`)

const setupDB = async() => {
	await tearDown()
	await pgMigrate({ 
		dir: path.join('.', 'migrations'),
		databaseUrl: process.env.DATABASE_URL,
		direction: 'up',
		migrationsTable: 'pgmigrations'
	})
}

const fixtures = {
	api(){
		return request(app)
	}
}

module.exports = {
	setupDB,
	tearDown,
	fixtures,
	resetDBTable
}
