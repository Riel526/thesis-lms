import createHandler from '../../../../middlewares/index';
import Teacher from '../../../../models/teacher';
import Subject from '../../../../models/subject';
import Section from '../../../../models/section';
import { jsonify } from '../../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  const documentKeys = req.query.studentInformation.map((info) => info.split(','))

  const selectSubdocumentKeys = req.query.getSubDocument.replaceAll(',', ' ')

  const selectDocumentKeys = documentKeys[0].toString().replaceAll(',', ' ')

  try {
    const teachers = await Teacher.find({}, `${selectDocumentKeys}`).populate('section subjects', `${selectSubdocumentKeys}`)
    res.status(200).json({ message: 'success', data: jsonify(teachers) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler