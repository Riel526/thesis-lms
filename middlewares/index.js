import dbMiddleware from '../utils/db'
import nextConnect from 'next-connect'

export default function createHandler(...middlewares) {

	return nextConnect({
		onNoMatch(req, res) {
			res.status(405).json({ error: `${req.method} request not allowed` })
		},
	}).use(dbMiddleware, ...middlewares)
}
