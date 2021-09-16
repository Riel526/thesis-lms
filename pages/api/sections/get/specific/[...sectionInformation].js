import createHandler from '../../../../../middlewares/index';
import GradeLevel from '../../../../../models/gradeLevel';
import Section from '../../../../../models/section';
import Subject from '../../../../../models/subject';
import { jsonify } from '../../../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  //SAMPLE LINK
  //where document = student and values to select are firstName and lastName
  //where subdocument = section and value/s to select is subjects
  //BASE_URL/api/students/get/firstName,lastName,image?getSubDocument=subjects

  const documentKeys = req.query.sectiontInformation.map((info) => info.split(','))

  const selectSubdocumentKeys = req.query.getSubDocument.replaceAll(',', ' ')

  const selectDocumentKeys = documentKeys[1].toString().replaceAll(',', ' ')

  const sectionId = documentKeys[0].toString()

  try {
    const students = await Student.find({ _id: sectionId }, `${selectDocumentKeys}`).populate('section gradeLevel', `${selectSubdocumentKeys}`)
    res.status(200).json({ message: 'success', data: jsonify(students) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler