import createHandler from '../../../../middlewares/index';
import GradeLevel from '../../../../models/gradeLevel';
import Subject from '../../../../models/subject';
import Section from '../../../../models/section';
import Teacher from '../../../../models/teacher';
import { jsonify } from '../../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  const documentKeys = req.query.sectionsInformation.map((info) => info.split(','))

  const selectSubdocumentKeys = req.query.getSubDocument.replaceAll(',', ' ')

  const selectDocumentKeys = documentKeys[0].toString().replaceAll(',', ' ')

  try {
    const sections = await Section.find({}, `${selectDocumentKeys}`).populate('subjects advisor gradeLevel', `${selectSubdocumentKeys}`)
    res.status(200).json({ message: 'success', data: jsonify(sections) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler