import { useState, useContext } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import FilledButton from '../../../../../components/Buttons/FilledButton'
import BorderedButton from '../../../../../components/Buttons/BorderedButton'
import AppContext from '../../../../../components/context/AppContext'
import {
  CaretLeft,
  AttachFileIcon,
} from '../../../../../components/Icons/Icons'
import Multiselect from 'multiselect-react-dropdown'

export async function getServerSideProps(context) {
  const { teacherId } = context.query
  const { messageId } = context.query
  const session = await getSession({ req: context.req })

  if (teacherId != session.user._id) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  const receivedMessage = await fetch(
    `${process.env.BASE_URL}/api/messages/${messageId}`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  return {
    props: {
      session,
      receivedMessage,
    },
  }
}

const NewMessage = (props) => {
  const router = useRouter()

  const [senderStudent, setSenderStudent] = useState(
    props.receivedMessage.senderStudent && {
      _id: props.receivedMessage.senderStudent._id,
      name: `${props.receivedMessage.senderStudent.firstName} ${props.receivedMessage.senderStudent.lastName}`,
    }
  )

  const [senderTeacher, setSenderTeacher] = useState(
    props.receivedMessage.senderTeacher && {
      _id: props.receivedMessage.senderTeacher._id,
      name: `${props.receivedMessage.senderTeacher.firstName} ${props.receivedMessage.senderTeacher.lastName}`,
    }
  )

  const handleReply = () => {
    router.push(
      `/messages/teacher/${router.query.teacherId}/new-message?${
        senderStudent ? 'student' : 'teacher'
      }=${
        (senderStudent && senderStudent._id) ||
        (senderTeacher && senderTeacher._id)
      }`
    )
  }
  console.log(props.receivedMessage)
  return (
    <div className='flex flex-col w-full bg-WSAI-Indigo-25 text-WSAI-JetBlack'>
      <header className='flex items-center justify-between w-full h-[5.5rem] px-4 border-b border-WSAI-Indigo-100'>
        <a
          onClick={router.back}
          className='flex items-center justify-center bg-transparent rounded-full cursor-pointer w-7 h-7 justify-self-end'
        >
          <CaretLeft className='w-8 h-8 fill-current text-WSAI-Indigo-500' />
        </a>
        <div className='flex flex-col'>
          <h1 className='text-3xl text-right text-WSAI-Indigo-500'>
            View Message
          </h1>
          {!router.query.ref ? (
            <p>
              Sent by:
              {senderStudent != null &&
                senderTeacher == null &&
                senderStudent.name}
              {senderTeacher != null &&
                senderStudent == null &&
                senderTeacher.name}
            </p>
          ) : (
            <p>
              Sent to:
              {props.receivedMessage.studentReciepient != null &&
                props.receivedMessage.teacherReciepient == null &&
                ` ${props.receivedMessage.studentReciepient.firstName} ${props.receivedMessage.studentReciepient.lastName}`}
              {props.receivedMessage.teacherReciepient != null &&
                props.receivedMessage.studentReciepient == null &&
                ` ${props.receivedMessage.teacherReciepient.firstName} ${props.receivedMessage.teacherReciepient.lastName}`}
            </p>
          )}
        </div>
      </header>
      <main className='relative flex flex-col flex-1'>
        <div className='flex items-center w-full p-4 border-b gap-x-4 h-14 border-WSAI-Indigo-100'>
          <label className='w-28' htmlFor='Subject'>
            Subject:
          </label>
          <div
            id='Subject'
            type='text'
            className='p-1.5 shadow-inner bg-WSAI-Indigo-100 rounded-md focus:outline-none focus:ring w-full truncate'
          >
            {props.receivedMessage.subject}
          </div>
        </div>
        <div className='contents'>
          <div className='flex-1 w-full h-full p-2 break-words border-b shadow-inner resize-none border-b-WSAI-Indigo-100 bg-WSAI-Indigo-25 focus:outline-none focus:ring focus:ring-inset'>
            {props.receivedMessage.content}
          </div>
          {!router.query.ref && 
            <div className='flex items-center justify-end m-4 gap-x-4'>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type='file'
                id='Attach File'
                name='attachFile'
                className='hidden'
              />
              {props.receivedMessage.attachedFile && (
                <a
                  href={props.receivedMessage.attachedFile}
                  className='text-sm font-bold text-WSAI-Indigo-300'
                >
                  Download Attached
                </a>
              )}
              <button
                onClick={() => handleReply()}
                className='h-12 rounded-md shadow w-36 bg-WSAI-Indigo-150 focus:outline-none focus:ring hover:-translate-y-1.5 hover:shadow-md transition-transform ease-out'
              >
                Reply
              </button>
            </div>
          }
        </div>
      </main>
    </div>
  )
}

export default NewMessage
