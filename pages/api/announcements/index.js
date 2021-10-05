import createHandler from '../../../middlewares/index'
import { jsonify } from '../../../utils/db'
import Announcement from '../../../models/announcement'
import Subject from '../../../models/subject'

const handler = createHandler()

handler.get(async (req, res) => {
  try {
    const announcement = await Announcement.find({}, '-__v')
    res.status(200).json({ message: 'success', data: jsonify(announcement) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

handler.post(async (req, res) => {
  try {
    const announcement = await Announcement.create({
      title: req.body.title,
      content: req.body.content,
      subject: req.body.subject,
    })
    
    await Subject.findOneAndUpdate(
      { _id: req.body.subject },
      {
        $addToSet: {
          announcements: announcement,
        },
      }
    )

    res.status(200).json({ message: 'success' })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
