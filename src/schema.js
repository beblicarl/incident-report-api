const Joi = require('joi')

const incidentReportSchema = Joi.object({
	body:{
		incidentDescription: Joi.string()
			.min(3)
			.required(),
		city: Joi.string()
			.required(),
		country: Joi.string()
			.required()
	}
})

module.exports = {
	incidentReportSchema
}