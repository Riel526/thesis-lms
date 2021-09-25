import createHandler from '../../../../../middlewares/index';
import GradeLevel from '../../../../../models/gradeLevel';
import Section from '../../../../../models/section';
import Subject from '../../../../../models/subject';
import { jsonify } from '../../../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  const documentKeys = req.query.sectionInformation.map((info) => info.split(','))

  const selectSubdocumentKeys = req.query.getSubDocument.replaceAll(',', ' ')

  const selectDocumentKeys = documentKeys[1].toString().replaceAll(',', ' ')

  const sectionId = documentKeys[0].toString()

  try {
    const section = await Section.findOne({ _id: sectionId }, `${selectDocumentKeys}`).populate('subjects advisor', `${selectSubdocumentKeys}`)
    res.status(200).json({ message: 'success', data: jsonify(section) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler