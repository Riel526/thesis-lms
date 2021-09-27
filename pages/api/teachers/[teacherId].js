import createHandler from '../../../middlewares/index'
import Teacher from '../../../models/teacher'
import Subject from '../../../models/subject'
import Section from '../../../models/section'
import { jsonify } from '../../../utils/db'

const handler = createHandler()

handler.get(async (req, res) => {
  const { teacherId } = req.query

  try {
    const teachers = await Teacher.findOne(
      { _id: teacherId },
      '_id image firstName lastName birthDate email role files introduction contactNumber'
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

handler.patch(async (req, res) => {
  const { teacherId, password } = req.query
  try {
    console.log(req.body.introduction)
    await Teacher.findOneAndUpdate(
      { _id: teacherId },
      {
        introduction: req.body.introduction,
      }
    )
    res.status(200).json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed' })
  }
})

export default handler
