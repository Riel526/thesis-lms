import createHandler from '../../../middlewares/index';
import Teacher from '../../../models/teacher';
import Section from '../../../models/section';
import Subject from '../../../models/subject';
import Student from '../../../models/student';
import { jsonify } from '../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  const { sectionId } = req.query

  try {
    const section = await Section.findOne({ _id: sectionId }).populate('subjects advisor students', `${selectSubdocumentKeys}`)
    res.status(200).json({ message: 'success', data: jsonify(section) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler