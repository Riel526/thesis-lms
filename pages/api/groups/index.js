import createHandler from '../../../middlewares/index'
import { jsonify } from '../../../utils/db'
import Group from '../../../models/group'
import Student from '../../../models/student'
import Teacher from '../../../models/teacher'

const handler = createHandler()

handler.get(async (req, res) => {
  try {
    const group = await Group.find({}, '-__v')
    res.status(200).json({ message: 'success', data: jsonify(group) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

handler.post(async (req, res) => {
  const { role } = req.query
  try {
    const group = await Group.create({
      image: req.body.attachedFile,
      groupName: req.body.groupName,
      inviteCode: req.body.inviteCode,
      createdBy: req.body.createdBy,
      members: [...req.body.members, req.body.createdBy],
    })

    if (role == 'student') {
      await Student.findOneAndUpdate(
        { _id: req.body.createdBy },
        {
          $addToSet: { groups: group },
        }
      )
    } else if (role == 'teacher') {
      await Teacher.findOneAndUpdate(
        { _id: req.body.createdBy },
        {
          $addToSet: { groups: group },
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
    await Module.deleteOne({ _id: req.body._id })

    await Subject.findOneAndUpdate({ $in: { modules: req.body._id } })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
