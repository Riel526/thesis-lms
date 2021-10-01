import createHandler from '../../../middlewares/index'
import Teacher from '../../../models/teacher'
import Subject from '../../../models/subject'
import Section from '../../../models/section'
import LockerFile from '../../../models/lockerFile'
import Group from '../../../models/group'
import { jsonify } from '../../../utils/db'

const handler = createHandler()

handler.get(async (req, res) => {
  const { teacherId } = req.query

  try {
    const teachers = await Teacher.findOne(
      { _id: teacherId },
      '_id image firstName lastName birthDate email role files introduction contactNumber lockerFiles'
    )
      .populate({
        path: 'subjects',
      })
      .populate({
        path: 'advisorySection',
      }).populate({
        path: 'lockerFiles'
      }).populate({
        path: 'groups',
        select: '_id image groupName'
      })

    res.status(200).json({ message: 'success', data: jsonify(teachers) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

handler.patch(async (req, res) => {
  const { teacherId, password } = req.query
  try {
    const teacher = await Teacher.findOne({ _id: teacherId })

    if (req.body.introduction) teacher.introduction = req.body.introduction
    if (req.body.image)teacher.image = req.body.image

    teacher.save()

    res.status(200).json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed' })
  }
})

export default handler
