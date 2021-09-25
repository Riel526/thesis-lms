import createHandler from '../../../../../middlewares/index'
import Subject from '../../../../../models/subject'
import Students from '../../../../../models/student'
import Section from '../../../../../models/section'
import Teacher from '../../../../../models/teacher'
import { jsonify } from '../../../../../utils/db'

const handler = createHandler()

handler.get(async (req, res) => {
  const documentKeys = req.query.subjectInformation.map((info) =>
    info.split(',')
  )

  const subjectId = documentKeys[0].toString()

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
    res.status(200).json({ message: 'success', data: jsonify(subjects) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
