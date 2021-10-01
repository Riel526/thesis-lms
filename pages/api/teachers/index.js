import createHandler from '../../../middlewares/index';
import { jsonify } from '../../../utils/db';
import Teacher from '../../../models/teacher'

const handler = createHandler()

handler.get(async (req, res) => {

  try {
    const {select} = req.query
    
    const teacher = await Teacher.find({}, `${select}`)
    res.status(200).json({ message: 'success', data: jsonify(teacher) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler