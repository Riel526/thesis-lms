import mongoose from 'mongoose'

export async function dbConnect() {
	if (mongoose.connection.readyState >= 1) return

	return mongoose.connect(process.env.MONGO_URI)
}

export function jsonify(obj) {
	return JSON.parse(JSON.stringify(obj))
}

export default async function dbMiddleware(req, res, next) {
	try {
		if (!global.mongoose) {
			global.mongoose == dbConnect()
		}
	} catch (error) {
		console.error('error: ' + error)
	}

	return next()
}
