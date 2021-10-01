import { useCallback, useContext, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadFileIcon, LockerUploadIcon } from './../Icons/Icons'
import AppContext from '../context/AppContext'

const maximumCombinedSize = 50000000

function fileSizeValidator(file) {
  if (file.size > maximumCombinedSize) {
    return {
      code: 'File Too Large!',
      message: `File cannot exceed 50 Megabytes`,
    }
  }

  return null
}

const Dropzone = (props) => {
  const {
    setModalAttributes,
    setModuleFile,
    setLockerFiles,
    clearPendingLockerFiles,
  } = useContext(AppContext)


  const onDrop = useCallback(
    (acceptedFiles, errors) => {
      if (props.maxFiles === 1) {
        setModuleFile(null)
        acceptedFiles.map((acceptedFile) => setModuleFile(acceptedFile))
      } else {
        clearPendingLockerFiles()
        setLockerFiles(acceptedFiles)
      }

      if (errors[0]) {
        setModalAttributes({
          isOpen: true,
          status: 'error',
          customMessage: errors[0].errors[0].message,
        })
      }
    },
    [
      setModuleFile,
      setModalAttributes,
      setLockerFiles,
      props.maxFiles,
      clearPendingLockerFiles,
    ]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejection,
  } = useDropzone({
    validator: fileSizeValidator,
    onDrop,
    maxFiles: props.maxFiles,
    accept: props.allowedMimeTypes,
  })

  return (
    <section className="w-full">
      {!props.isFormDisplay ? (
        <div className="relative h-full">
          <div
            {...getRootProps({
              className:
                'flex flex-col h-72 items-center justify-center focus:ring focus:ring-inset focus:outline-none p-2 group',
            })}
          >
            <input
              {...getInputProps({
                id: 'Module',
                required: props.isRequired ? true : false,
              })}
            />
            <LockerUploadIcon
              className={`stroke-current text-WSAI-Indigo-500 duration-300 transition-opacity opacity-80 group-hover:opacity-100 ${
                acceptedFiles.length > 0 && 'hidden'
              }`}
            />
            <p
              className={`font-bold uppercase duration-300 text-WSAI-Indigo-500 transition-opacity opacity-80 group-hover:opacity-100 ${
                acceptedFiles.length > 0 && 'hidden'
              }`}
            >
              Maximum of 3 files per upload
            </p>
          </div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <ul className="flex flex-col gap-y-2 text-WSAI-Indigo-500">
              {acceptedFiles.map((file) => {
                return (
                  <li className="truncate w-60" key={file.path}>
                    {file.name}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div
            {...getRootProps({
              className:
                'bg-WSAI-Indigo-100 mb-2 shadow-inner rounded-md flex flex-col h-36 items-center justify-center focus:ring focus:ring-inset focus:outline-none p-2',
            })}
          >
            <input {...getInputProps({ id: 'Module' })} />
            <UploadFileIcon
              className={`shadow-inner stroke-current duration-300 transition-opacity ${
                isDragActive ? 'text-indigo-500 opacity-50' : 'opacity-20 '
              }`}
            />
            <p
              className={`px-2 text-sm opacity-70 transition-colors duration-300 ${
                isDragActive && 'text-indigo-500'
              }`}
            >
              Click to upload file or drag your file here
            </p>
          </div>
          File List:
          <div className="p-1 text-sm">
            <ul className="">
              {acceptedFiles.map((file, index) => {
                return (
                  <li className="truncate" key={file.path}>
                    {index + 1}. {file.name}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}

export default Dropzone
