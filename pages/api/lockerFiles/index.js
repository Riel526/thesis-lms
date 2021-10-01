import createHandler from '../../../middlewares/index'
import { jsonify } from '../../../utils/db'
import LockerFile from '../../../models/lockerFile'
import Student from '../../../models/student'
import Teacher from '../../../models/teacher'

const handler = createHandler()

handler.get(async (req, res) => {
  try {
    const lockerFile = await LockerFile.find({}, '-__v')
    res.status(200).json({ message: 'success', data: jsonify(lockerFile) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

handler.post(async (req, res) => {
  const { role } = req.query
  try {
    let userId = `${role}id`
    const lockerFile = await LockerFile.create({
      fileName: req.body.fileName,
      fileType: req.body.fileType,
      file: req.body.attachedFile,
      studentMembers: req.body.studentMembers,
      teacherMembers: req.body.teacherMembers,
    })

    if (role == 'student') {
      await Student.findOneAndUpdate(
        { _id: req.body.userId },
        {
          $addToSet: { lockerFiles: lockerFile },
        }
      )
    } else if (role == 'teacher') {
      await Teacher.findOneAndUpdate(
        { _id: req.body.userId },
        {
          $addToSet: { lockerFiles: lockerFile },
        }
      )
    }

    res.status(200).json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed', error: err })
  }
})

handler.delete(async (req, res) => {
  try {
    await lockerFile.deleteOne({ _id: req.body._id })

    await Subject.findOneAndUpdate({ $in: { lockerFiles: req.body._id } })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
