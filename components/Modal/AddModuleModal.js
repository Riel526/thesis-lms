import { useEffect, useState, useContext } from 'react'
import { Dialog } from '@headlessui/react'
import BorderedButton from '../Buttons/BorderedButton'
import FilledButton from './../Buttons/FilledButton'
import Dropzone from '../Dropzone/Dropzone'
import AppContext from '../context/AppContext'

const moduleTypes = [
  'Document',
  'Presentation',
  'Image',
  'Video',
  'Audio',
  'Link',
  ,
]
const moduleQuarters = [
  'First Quarter',
  'Second Quarter',
  'Third Quarter',
  'Fourth Quarter',
]

export default function AddModuleModal({ isOpen, setIsOpen, subjectId }) {
  const { moduleFile, uploadFiles, setModalAttributes, setModuleFile } = useContext(AppContext)
  const [allowedMimeTypes, setAllowedMimeTypes] = useState(
    'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf'
  )

  const [moduleDetails, setModuleDetails] = useState({
    moduleTitle: '',
    moduleDescription: '',
    subject: subjectId,
    moduleQuarter: 'First Quarter',
    isHidden: false,
    attachedFile: '',
    link: '',
  })

  useEffect(() => {
    if (moduleDetails.moduleType == 'Document')
      setAllowedMimeTypes(
        'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/epub+zip, text/csv,'
      )
    if (moduleDetails.moduleType == 'Presentation')
      setAllowedMimeTypes(
        'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.template'
      )
    if (moduleDetails.moduleType == 'Image')
      setAllowedMimeTypes(
        'image/bmp, image/gif, image/vnd.microsoft.icon, image/jpeg, image/png, image/jfif, image/svg+xml, image/tiff, image/webp'
      )
    if (moduleDetails.moduleType == 'Video')
      setAllowedMimeTypes(
        'video/mp4, video/quicktime, video/x-msvideo, video/mpeg, video/3gpp, video/3gpp2, video/ogg, video/mp2t, video/webm, video/x-matroska '
      )
    if (moduleDetails.moduleType == 'Audio')
      setAllowedMimeTypes(
        'audio/aac, application/x-cdf, audio/midi, audio/x-midi, audio/mpeg, audio/ogg, audio/opus, audio/wav, audio/webm, audio/3gpp, audio/3gpp2'
      )

    if (moduleFile)
      setModuleDetails((prevState) => {
        return {
          ...prevState,
          link: '',
        }
      })
  }, [moduleDetails.moduleType, setModuleDetails, moduleFile])

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    setModuleDetails((prevState) => {
      return {
        ...prevState,
        [key]: value,
      }
    })
  }

  const resetFields = () => {
    setModuleDetails({
      moduleTitle: '',
      moduleDescription: '',
      subject: subjectId,
      moduleQuarter: 'First Quarter',
      isHidden: false,
      attachedFile: '',
      link: '',
    })
  }

  const handleCheckboxChange = (e) => {
    const key = e.target.name
    const checked = e.target.checked

    setModuleDetails((prevState) => {
      return {
        ...prevState,
        [key]: checked,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setModalAttributes({
      isOpen: true,
      status: 'loading',
      customMessage: '',
    })

    uploadFiles(
      `${process.env.BASE_URL}/api/modules`,
      moduleDetails,
      moduleFile,
      `Modules/${subjectId}`,
      false
    )

    setModuleDetails({
      moduleTitle: '',
      moduleDescription: '',
      subject: subjectId,
      moduleQuarter: 'First Quarter',
      isHidden: false,
      attachedFile: '',
      link: '',
    })
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        className="fixed inset-0 z-40 flex items-center justify-center h-full overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 z-10 flex text-center transition-transform duration-300 ease-in-out bg-gray-900 bg-opacity-80" />

        <div className={`relative z-40`}>
          <div
            className={` bg-WSAI-Indigo-25 ${
              moduleDetails.moduleType == 'Link' ? 'h-[35rem]' : 'h-[50rem]'
            } transition-[height] duration-200 ease-in-out  text-WSAI-JetBlack flex flex-col overflow-hidden rounded-md`}
          >
            <header className="w-full h-12 p-2 text-lg font-medium border-b border-WSAI-Indigo-100">
              Add Module
            </header>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="grid grid-cols-2 p-2 gap-y-4 gap-x-4"
            >
              <div className="flex flex-col gap-y-1">
                <label htmlFor="Module Title">*Title:</label>
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  value={moduleDetails.moduleTitle}
                  className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 t shadow-inner bg-WSAI-Indigo-100"
                  name="moduleTitle"
                  id="Module Title"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="Module Type">*Type:</label>
                <select
                  required
                  onChange={(e) => handleChange(e)}
                  value={moduleDetails.moduleType}
                  className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 t shadow-inner bg-WSAI-Indigo-100"
                  name="moduleType"
                  id="Module Type"
                >
                  {moduleTypes.map((moduleType) => {
                    return (
                      <option
                        key={moduleType}
                        id={moduleType}
                        name={moduleType}
                        value={moduleType}
                      >
                        {moduleType}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="relative flex flex-col col-span-2 gap-y-1">
                <label htmlFor="Module Quarter">*Quarter:</label>
                <select
                  required
                  onChange={(e) => handleChange(e)}
                  value={moduleDetails.moduleQuarter}
                  className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 t shadow-inner bg-WSAI-Indigo-100"
                  name="moduleQuarter"
                  id="Module Quarter"
                >
                  {moduleQuarters.map((moduleQuarter) => {
                    return (
                      <option
                        key={moduleQuarter}
                        id={moduleQuarter}
                        name={moduleQuarter}
                        value={moduleQuarter}
                      >
                        {moduleQuarter}
                      </option>
                    )
                  })}
                </select>
                <div className="flex items-center justify-end text-sm gap-x-2">
                  <input
                    onChange={(e) => handleCheckboxChange(e)}
                    checked={moduleDetails.isHidden}
                    type="checkbox"
                    name="isHidden"
                    id="Hide Module"
                  />
                  <label htmlFor="Hide Module">Hide Module</label>
                </div>
              </div>
              <div className="flex flex-col col-span-2 gap-y-1">
                <label
                  onChange={(e) => handleChange(e)}
                  htmlFor="Module Description"
                >
                  *Description:
                </label>
                <textarea
                  required
                  maxLength={250}
                  value={moduleDetails.moduleDescription}
                  onChange={(e) => handleChange(e)}
                  className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 h-36 t shadow-inner resize-none bg-WSAI-Indigo-100"
                  name="moduleDescription"
                  id="Module Description"
                />
              </div>
              {moduleDetails.moduleType == 'Link' ? (
                <div className="flex flex-col col-span-2 gap-y-1">
                  <label htmlFor="link">*Link:</label>
                  <input
                    required={moduleDetails.moduleType != 'Link' ? false : true}
                    onChange={(e) => handleChange(e)}
                    value={moduleDetails.link}
                    className="rounded-md focus:outline-none focus:ring focus:ring-inset p-1.5 t shadow-inner bg-WSAI-Indigo-100"
                    name="link"
                    id="link"
                  />
                </div>
              ) : (
                <div className="flex flex-col col-span-2 gap-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="Module">*Upload:</label>
                    <span className="text-xs">Maximum of 1 file</span>
                  </div>
                  <Dropzone
                    isRequired={
                      moduleDetails.moduleType != 'Link' ? true : false
                    }
                    isFormDisplay={true}
                    maxFiles={1}
                    allowedMimeTypes={allowedMimeTypes}
                  />
                </div>
              )}
              <div className="absolute bottom-0 right-0 flex justify-end w-full p-2 rounded-b-md justify-self-end gap-x-2 bg-WSAI-Indigo-50">
                <BorderedButton
                  colors={
                    'hover:bg-red-600 hover:text-WSAI-Indigo-25 focus:bg-red-600 focus:text-WSAI-Indigo-25 border-red-600 text-red-600'
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(false)
                    resetFields()
                  }}
                  className="relative z-40 "
                >
                  Cancel
                </BorderedButton>
                <FilledButton>Submit</FilledButton>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}
