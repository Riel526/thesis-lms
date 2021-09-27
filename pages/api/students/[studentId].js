import createHandler from '../../../middlewares/index'
import Student from '../../../models/student'
import GradeLevel from '../../../models/gradeLevel'
import Section from '../../../models/section'
import Subject from '../../../models/subject'
import { jsonify } from '../../../utils/db'

const handler = createHandler()

handler.get(async (req, res) => {
  const { studentId } = req.query

  try {
    const student = await Student.findOne(
      { _id: studentId },
      '_id image firstName lastName birthDate email role subjects section files'
    )
      .populate({
        path: 'subjects',
      })
      .populate({
        path: 'section',
      })

    res.status(200).json({ message: 'success', data: jsonify(student) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
