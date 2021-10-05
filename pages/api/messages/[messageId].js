import createHandler from '../../../middlewares/index';
import Teacher from '../../../models/teacher';
import Message from '../../../models/message';
import Student from '../../../models/student';
import { jsonify } from '../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  const { messageId } = req.query

  try {
    const message = await Message.findOne({ _id: messageId }).populate('studentReciepient teacherReciepient senderTeacher senderStudent')
    res.status(200).json({ message: 'success', data: jsonify(message) })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler