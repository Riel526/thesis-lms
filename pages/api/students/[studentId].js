import createHandler from '../../../middlewares/index';
import { jsonify } from '../../../utils/db';
import Student from '../../../models/student'
import Subject from '../../../models/subject'
import Section from '../../../models/section'
import gradeLevel from '../../../models/gradeLevel'


const handler = createHandler()

handler.get(async (req, res) => {
  const { studentId } = req.query
  try {
    const student = await Student.findOne({ _id: studentId }, '-__v').populate('section gradeLevel')

    res.status(200).json({ message: 'success', data: jsonify(student) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler