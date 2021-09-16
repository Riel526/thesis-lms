import createHandler from '../../../../../middlewares/index';
import Subject from '../../../../../models/subject';
import { jsonify } from '../../../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  const documentKeys = req.query.subjectInformation.map((info) => info.split(','))

  const selectDocumentKeys = documentKeys[1].toString().replaceAll(',', ' ')

  const subjectId = documentKeys[0].toString()

  try {
    const subjects = await Subject.find({ _id: subjectId }, `${selectDocumentKeys}`)
    res.status(200).json({ message: 'success', data: jsonify(subjects) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler