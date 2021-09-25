import createHandler from '../../../../middlewares/index';
import Student from '../../../../models/student';
import GradeLevel from '../../../../models/gradeLevel';
import Section from '../../../../models/section';
import { jsonify } from '../../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  const documentKeys = req.query.studentInformation.map((info) => info.split(','))

  const selectSubdocumentKeys = req.query.getSubDocument.replaceAll(',', ' ')

  const selectDocumentKeys = documentKeys[0].toString().replaceAll(',', ' ')

  try {
    const students = await Student.find({}, `${selectDocumentKeys}`).populate('section gradeLevel', `${selectSubdocumentKeys}`)
    res.status(200).json({ message: 'success', data: jsonify(students) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler