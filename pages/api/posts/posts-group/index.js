import createHandler from '../../../../middlewares/index'
import { jsonify } from '../../../../utils/db'
import Post from '../../../../models/post'
import Student from '../../../../models/student'
import Teacher from '../../../../models/teacher'
import Group from '../../../../models/group'
import Comment from '../../../../models/comment'

const handler = createHandler()

handler.get(async (req, res) => {
  try {
    const post = await Post.find({}, '-__v')
    res.status(200).json({ message: 'success', data: jsonify(post) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

handler.post(async (req, res) => {
  const { role } = req.query

  console.log(req.body)
  try {
    const post = await Post.create({
      content: req.body.content,
      attachedFile: req.body.attachedFile,
      postedByStudent: role == 'student' ? req.body.postedBy : null,
      postedByTeacher: role == 'teacher' ? req.body.postedBy : null,
      groupId: req.body.postedOnId,
    })

    await Group.findOneAndUpdate({_id: req.body.postedOnId}, {
      $addToSet: {
        posts: post,
      }
    })

    if (role == 'student') {
      await Student.findOneAndUpdate(
        { _id: req.body.postedBy },
        {
          $addToSet: {
            posts: post,
          },
        }
      )
    } else if (role == 'teacher') {
      await Teacher.findOneAndUpdate(
        { _id: req.body.postedBy },
        {
          $addToSet: {
            posts: post,
          },
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
