import { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadFileIcon } from './../Icons/Icons'
import AppContext from '../context/AppContext'

const maximumCombinedSize = 100000000

function fileSizeValidator(file) {
  if (file.size > maximumCombinedSize) {
    return {
      code: 'File Too Large!',
      message: `File cannot exceed 100 Megabytes`,
    }
  }

  return null
}

const Dropzone = (props) => {
  const { setModalAttributes, setModuleFile } = useContext(AppContext)

  const onDrop = useCallback((acceptedFiles, errors) => {

    acceptedFiles.map(acceptedFile => 
      setModuleFile(acceptedFile))

    if (errors[0]) {
      setModalAttributes({
        isOpen: true,
        status: 'error',
        customMessage: errors[0].errors[0].message,
      })
    }
  }, [setModuleFile, setModalAttributes])

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
    </section>
  )
}

export default Dropzone
