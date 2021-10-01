import createHandler from '../../../middlewares/index'
import Student from '../../../models/student'
import Teacher from '../../../models/teacher'
import Post from '../../../models/post'
import Group from '../../../models/group'
import { jsonify } from '../../../utils/db'

const handler = createHandler()

handler.get(async (req, res) => {
  const { groupId } = req.query
  const { select } = req.query

  try {
    const group = await Group.findOne({ _id: groupId }, `${select}`)
      .populate({
        path: 'members',
        model: 'Student, Teacher'
      })
      .populate({
        path: 'createdBy',
        model: 'Teacher'
      })
      .populate({
        path: 'posts',
      })

    res.status(200).json({ message: 'success', data: jsonify(group) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
