import createHandler from '../../../../../middlewares/index'
import Teacher from '../../../../../models/teacher'
import Subject from '../../../../../models/subject'
import Section from '../../../../../models/section'
import { jsonify } from '../../../../../utils/db'

const handler = createHandler()

handler.get(async (req, res) => {

  const { teacherId } = req.query
  try {
    const teachers = await Teacher.findOne(
      { _id: teacherId },
      '_id image firstName lastName birthDate email role'
    )
      .populate({
        path: 'subjects',
      })
      .populate({
        path: 'advisorySection',
      })

    res.status(200).json({ message: 'success', data: jsonify(teachers) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
