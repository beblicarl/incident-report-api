const Joi = require('joi')

const incidentReportSchema = Joi.object({
	body:{
		incidentDescription: Joi.string()
			.min(3)
			.required(),
		city: Joi.string()
			.min(2)
			.max(100)
			.required(),
		country: Joi.string()
			.min(2)
			.max(100)
			.required()
	}
})

module.exports = {
	incidentReportSchema
}