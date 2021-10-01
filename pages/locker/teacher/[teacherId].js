import { useState, useContext } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import FilledButton from '../../../components/Buttons/FilledButton'
import BorderedButton from '../../../components/Buttons/BorderedButton'
import AppContext from '../../../components/context/AppContext'
import Dropzone from '../../../components/Dropzone/Dropzone'
import {
  DocumentIcon,
  ImageIcon,
  PresentationIcon,
  AudioIcon,
  VideoIcon,
} from '../../../components/Icons/Icons'

export async function getServerSideProps(context) {
  const { teacherId } = context.query
  const session = await getSession({req: context.req})
  
  if(teacherId != session.user._id){
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  const userInformation = await fetch(
    `${process.env.BASE_URL}/api/teachers/${teacherId}`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  return {
    props: {
      userInformation,
    },
  }
}

const resourceTypes = [
  {
    icon: DocumentIcon,
    mimeType: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/epub+zip',
      'text/csv',
    ],
  },
  {
    icon: PresentationIcon,
    mimeType: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      'application/vnd.openxmlformats-officedocument.presentationml.template',
    ],
  },
  {
    icon: ImageIcon,
    mimeType: [
      'image/bmp',
      'image/gif',
      'image/vnd.microsoft.icon',
      'image/jpeg',
      'image/png',
      'image/jfif',
      'image/svg+xml',
      'image/tiff',
      'image/webp',
    ],
  },
  {
    icon: VideoIcon,
    mimeType: [
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/mpeg',
      'video/3gpp',
      'video/3gpp2',
      'video/ogg',
      'video/mp2t',
      'video/webm',
      'video/x-matroska ',
    ],
  },
  {
    icon: AudioIcon,
    mimeType: [
      'audio/aac',
      'application/x-cdf',
      'audio/midi',
      'audio/x-midi',
      'audio/mpeg',
      'audio/ogg',
      'audio/opus',
      'audio/wav',
      'audio/webm',
      'audio/3gpp',
      'audio/3gpp2',
    ],
  },
]

const UserProfile = (props) => {
  const router = useRouter()

  const { setModalAttributes, updateData, lockerFiles, uploadFiles } =
    useContext(AppContext)

  const [session, loading] = useSession()

  const handleUploadFiles = () => {
    // fetchURL,
    // data,
    // resource,
    // folderName,
    // isUpdate

    if (lockerFiles.length == 0) {
      setModalAttributes({
        isOpen: true,
        status: 'error',
        customMessage: 'No File Selected!',
      })
      return
    }
    setModalAttributes({
      isOpen: true,
      status: 'loading',
      customMessage: '',
    })

    lockerFiles.map((file) => {
      return (
        uploadFiles(
          `${process.env.BASE_URL}/api/lockerFiles?role=teacher`,
          {
            fileName: file.name,
            userId: session && session.user._id,
            fileType: file.type,
            attachedFile: '',
          },
          file,
          `Teachers'_Files/${session.user._id}`
        ),
        false
      )
    })
  }

  return (
    <div className="flex flex-col w-full p-6 bg-WSAI-Indigo-25">
      <header
        className={
          'flex items-center justify-center bg-WSAI-Indigo-50 rounded-t-md'
        }
      >
        <Dropzone maxFiles={3} />
      </header>
      <main className="flex flex-col">
        <div className="w-full h-12">
          <FilledButton className="w-full h-full rounded-t-none rounded-b-md" transition="none" onClick={(e) => handleUploadFiles()}>
            Upload
          </FilledButton>
        </div>
        <div className="grid grid-cols-5 mt-12 gap-y-6">
          {props.userInformation.lockerFiles != null &&
            props.userInformation.lockerFiles.map((file, index) => {
              return (
                <a
                  href={file.file}
                  className="relative flex justify-self-center flex-col items-center justify-center w-40 h-40 text-sm break-all rounded-md text-WSAI-Indigo-500 bg-WSAI-Indigo-100 focus:outline-none focus:ring focus:ring-inset before:absolute before:left-0 before:top-0 before:w-0 hover:before:w-full before:transition-[width] before:duration-200 overflow-hidden group before:h-1 before:bg-WSAI-Indigo-500"
                  key={file.fileName + index}
                >
                  {resourceTypes.map((resourceType) => {
                    if (resourceType.mimeType.includes(file.fileType)) {
                      return (
                        <resourceType.icon className="fill-current w-11 h-11" />
                      )
                    }
                  })}
                  <p className="p-4 text-center line-clamp-1">
                    {file.fileName}
                  </p>
                </a>
              )
            })}
        </div>
      </main>
    </div>
  )
}

export default UserProfile
