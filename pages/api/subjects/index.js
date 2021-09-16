import createHandler from '../../../middlewares/index';
import { jsonify } from '../../../utils/db';
import Subject from '../../../models/subject'

const handler = createHandler()

handler.get(async (req, res) => {

  try {
    const subject = await Subject.find({}, '-__v')
    res.status(200).json({ message: 'success', data: jsonify(subject) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler