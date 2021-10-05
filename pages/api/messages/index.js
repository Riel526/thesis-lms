import createHandler from '../../../middlewares/index'
import Student from '../../../models/student'
import Teacher from '../../../models/teacher'
import Message from '../../../models/message'

const handler = createHandler()

handler.post(async (req, res) => {
  const { role } = req.query

  try {
    const message = await Message.create({
      content: req.body.content,
      subject: req.body.subject,
      attachedFile: req.body.attachedFile,
      senderStudent: role == 'student' ? req.body.sender : null,
      senderTeacher: role == 'teacher' ? req.body.sender : null,
      studentReciepient: req.body.studentReciepient,
      teacherReciepient: req.body.teacherReciepient,
    })

    if (role == 'student') {
      await Student.findOneAndUpdate(
        { _id: req.body.sender },
        {
          $addToSet: {
            sentMessages: message,
          },
        }
      )
    } else if (role == 'teacher') {
      await Teacher.findOneAndUpdate(
        { _id: req.body.sender },
        {
          $addToSet: {
            sentMessages: message,
          },
        }
      )
    }

    if(req.body.studentReciepient){
      await Student.findOneAndUpdate(
        { _id: req.body.studentReciepient },
        {
          $addToSet: {
            receivedMessages: message,
          },
        }
      )
    }
    
    if(req.body.teacherReciepient){
      await Teacher.findOneAndUpdate(
        { _id: req.body.teacherReciepient },
        {
          $addToSet: {
            receivedMessages: message,
          },
        }
      )
    }

    res.status(200).json({ message: 'success' })
  } catch (err) {
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
