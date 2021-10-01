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

  let memberStudents = [...req.body.studentMembers]
  let memberTeachers = [...req.body.teacherMembers]

  if (role == 'student')
    memberStudents = [...memberStudents, req.body.createdBy]

  if (role == 'teacher')
    memberTeachers = [...memberTeachers, req.body.createdBy]

  try {
    const group = await Group.create({
      image: req.body.attachedFile,
      groupName: req.body.groupName,
      inviteCode: req.body.inviteCode,
      createdByStudent: role == 'student' ? req.body.createdBy : null,
      createdByTeacher: role == 'teacher' ? req.body.createdBy : null,
      membersTeacher: memberTeachers,
      membersStudent: memberStudents,
    })

    memberTeachers.map(async (teacher) => {
      await Teacher.findOneAndUpdate(
        { _id: teacher._id },
        {
          $addToSet: { groups: group },
        }
      )
    })

    memberStudents.map(async (student) => {
      await Student.findOneAndUpdate(
        { _id: student._id },
        {
          $addToSet: { groups: group },
        }
      )
    })

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
