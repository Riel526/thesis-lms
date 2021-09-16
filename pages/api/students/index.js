import createHandler from '../../../middlewares/index';
import { jsonify } from '../../../utils/db';
import Student from '../../../models/student'

const handler = createHandler()

handler.get(async (req, res) => {



  try {
    const student = await Student.find({}, '-__v')
    res.status(200).json({ message: 'success', data: jsonify(student) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler