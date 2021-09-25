import createHandler from '../../../middlewares/index';
import { jsonify } from '../../../utils/db';
import Teacher from '../../../models/teacher'
import Subject from '../../../models/subject'
import Section from '../../../models/section'



const handler = createHandler()

handler.get(async (req, res) => {
  const { teacherId } = req.query
  try {
    const teacher = await Teacher.findOne({ _id: teacherId }, '-__v').populate('section subjects')

    res.status(200).json({ message: 'success', data: jsonify(teacher) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler