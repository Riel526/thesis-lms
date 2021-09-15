const mongoose = require('mongoose')

const MODEL_NAME = 'Event'

const schema = new mongoose.Schema({
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

module.exports = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'events')
