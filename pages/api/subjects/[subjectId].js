import createHandler from '../../../middlewares/index'
import Subject from '../../../models/subject'
import Students from '../../../models/student'
import Section from '../../../models/section'
import Teacher from '../../../models/teacher'
import Module from '../../../models/module'
import { jsonify } from '../../../utils/db'

const handler = createHandler()

handler.get(async (req, res) => {
  const { subjectId } = req.query

  try {
    const subjects = await Subject.findOne({ _id: subjectId })
      .populate({
        path: 'students',
        perDocumentLimit: 5,
        select: '_id image firstName lastName',
      })
      .populate({
        path: 'teacher',
      })
      .populate({
        path: 'section',
      })
      .populate({
        path: 'modules',
      })
    res.status(200).json({ message: 'success', data: jsonify(subjects) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
