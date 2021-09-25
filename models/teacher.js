const mongoose = require('mongoose')

const MODEL_NAME = 'Teacher'

const subjectSchema = new mongoose.Schema({
	subjectid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subject',
		required: true,
	},
	sectionid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section',
		required: true,
	}
})

const schema = new mongoose.Schema({
	image: {
		type: String,
		required: false,
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	middleName: {
		type: String,
		required: false,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	suffixName: {
		type: String,
		required: false,
		trim: true,
	},
	gender: {
		type: String,
		required: true,
		trim: true,
	},
	birthDate: {
		type: Date,
		required: true,
		trim: true,
	},
	contactNumber: {
		type: String,
		required: true,
		trim: true,
		index: { unique: true }
	},
	email: {
		type: String,
		required: true,
		trim: true,
		index: { unique: true }
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 6,
	},
	subjects: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subject',
		required: false,
	}],
	advisorySection: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section',
		required: false,
		trim: true,
	},
	role: {
		type: String,
		required: true,
	}
})

module.exports =
	mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'teachers')
