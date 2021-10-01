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
  try {
    const group = await Group.create({})

    await Subject.findOneAndUpdate(
      {
        _id: req.body.subject,
      },
      {
        $addToSet: {
          modules: module,
        },
      }
    )
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
