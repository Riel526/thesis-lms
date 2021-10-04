import createHandler from '../../../middlewares/index'
import Student from '../../../models/student'
import Teacher from '../../../models/teacher'
import Post from '../../../models/post'
import Comment from '../../../models/comment'
import Group from '../../../models/group'
import { jsonify } from '../../../utils/db'

const handler = createHandler()

handler.get(async (req, res) => {
  const { groupId } = req.query
  const { select } = req.query

  try {
    const group = await Group.findOne({ _id: groupId }, `${select}`)
      .populate({
        path: 'membersStudent',
        model: 'Student',
        select: '_id groups image firstName lastName role posts',
      })
      .populate({
        path: 'membersTeacher',
        model: 'Teacher',
        select: '_id groups image firstName lastName role posts',
      })
      .populate({
        path: 'createdByStudent',
        model: 'Student',
        select: '_id groups image firstName lastName role posts',
      })
      .populate({
        path: 'createdByTeacher',
        model: 'Teacher',
        select: '_id groups image firstName lastName role posts',
      })
      .populate({
        path: 'posts',
        model: 'Post',
        populate: 'postedByTeacher postedByStudent comments',
      })

    res.status(200).json({ message: 'success', data: jsonify(group) })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
