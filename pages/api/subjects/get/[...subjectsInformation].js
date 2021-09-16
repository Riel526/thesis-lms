import createHandler from '../../../../middlewares/index';
import Subject from '../../../../models/subject';
import { jsonify } from '../../../../utils/db';


const handler = createHandler()

handler.get(async (req, res) => {

  const toGet = req.query.subjectInformation.map((info) => info.split(','))

  const select = toGet[0].toString().replaceAll(',', ' ')

  try {
    const subjects = await Subject.find({}, `${select}`)
    res.status(200).json({ message: 'success', data: jsonify(subjects) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler