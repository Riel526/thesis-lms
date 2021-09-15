const mongoose = require('mongoose')

const MODEL_NAME = 'User'

const eventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	start: {
		type: Date,
		required: true,
		trim: true
	},
	end: {
		type: Date,
		required: false,
		trim: true
	},
	isWholeDay: {
		type: Boolean,
		required: true
	},
	isPrivate: {
		type: Boolean,
		required: true
	},
	description: {
		type: String,
		required: true
	}
})

const schema = new mongoose.Schema({
	image: {
		type: String,
		required: false
	},
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	middleName: {
		type: String,
		required: false,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	suffixName: {
		type: String,
		required: false,
		trim: true
	},
	birthDate: {
		type: Date,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true
	},
	contactNumber: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 6
	},
	role: {
		type: String,
		required: true,
		trim: true
	},
	events: [ eventSchema ]
})

module.exports = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'users')
