import createHandler from '../../../middlewares/index'
import { jsonify } from '../../../utils/db'
import Module from '../../../models/module'

const handler = createHandler()

handler.get(async (req, res) => {
  try {
    const module = await Module.find({}, '-__v')
    res.status(200).json({ message: 'success', data: jsonify(module) })
  } catch (err) {
    res.status(400).json({ message: 'failed', error: err })
  }
})

handler.post(async (req, res) => {
  try {
    await Module.create({
      moduleTitle: req.body.moduleTitle,
      moduleDescription: req.body.moduleDescription,
      moduleQuarter: req.body.moduleQuarter,
      attachedFile: req.body.attachedFile,
      subject: req.body.subject,
      link: req.body.link,
      isHidden: req.body.isHidden,
    })
    res.status(200).json({ message: 'success' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'failed', error: err })
  }
})

export default handler
