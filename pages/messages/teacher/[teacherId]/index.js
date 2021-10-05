import { useState, useContext } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import FilledButton from '../../../../components/Buttons/FilledButton'
import BorderedButton from '../../../../components/Buttons/BorderedButton'
import AppContext from '../../../../components/context/AppContext'
import { AddIcon } from '../../../../components/Icons/Icons'

export async function getServerSideProps(context) {
  const { teacherId } = context.query
  const session = await getSession({ req: context.req })

  if (teacherId != session.user._id) {
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

const UserProfile = (props) => {
  const router = useRouter()
  const { setModalAttributes, updateData } = useContext(AppContext)

  console.log(router.query.message)

  const [session, loading] = useSession()

  return (
    <div className='relative flex flex-col w-full bg-WSAI-Indigo-25 text-WSAI-JetBlack'>
      <main className='flex flex-col grid-cols-1 border-r border-WSAI-Indigo-100'>
        <header className='flex items-center justify-between w-full h-[5.5rem] px-4 border-b border-WSAI-Indigo-100'>
          <h1 className='text-3xl text-WSAI-Indigo-500'>Messages</h1>
          <Link
            href={`/messages/teacher/${router.query.teacherId}/new-message`}
          >
            <a className='flex items-center justify-center rounded-full w-7 h-7 bg-WSAI-Indigo-500 justify-self-end'>
              <AddIcon className='fill-current w-7 h-7 text-WSAI-Indigo-25' />
            </a>
          </Link>
        </header>
        {router.query.message == 'received' || router.query.message == undefined
          ? props.userInformation.receivedMessages.map((message) => {
              return (
                <Link key={message._id} href={`/messages/teacher/${router.query.teacherId}/view-message/${message._id}`}>
                  <a className='relative flex items-center w-full h-32 p-2 overflow-hidden border-b border-collapse even:bg-WSAI-Indigo-25 odd:bg-WSAI-Indigo-25 border-WSAI-Indigo-50 gap-x-2'>
                    <h1 className='absolute top-0 mt-2 text-sm capitalize left-2 line-clamp-1'>
                      {message.senderTeacher ? (
                        <p>
                          {`${message.senderTeacher.firstName} ${message.senderTeacher.lastName}`}
                        </p>
                      ) : (
                        `${message.senderStudent.firstName} ${message.senderStudent.lastName}`
                      )}
                    </h1>
                    <div className='relative flex flex-col items-center '>
                      <figure className='relative overflow-hidden border-2 rounded-full w-14 h-14 border-WSAI-Indigo-400'>
                        <Image
                          layout='fill'
                          src={
                            (message.senderTeacher &&
                              message.senderTeacher.image) ||
                            (message.senderStudent &&
                              message.senderStudent.image) ||
                            '/avatar.png'
                          }
                          alt='sender'
                        />
                      </figure>
                    </div>
                    <div className='flex flex-col justify-center text-sm'>
                      <p className='font-bold line-clamp-1'>
                        <span className='font-normal'>Subject:</span>{' '}
                        {message.subject}
                      </p>
                      <p className='break-all line-clamp-1'>
                        {message.content}
                      </p>
                    </div>
                  </a>
                </Link>
              )
            })
          : props.userInformation.sentMessages.map((message) => {
              return (
                <Link key={message._id} href={`/messages/teacher/${router.query.teacherId}/view-message/${message._id}?ref=sent`}>
                  <a className='relative flex items-center w-full h-32 p-2 overflow-hidden border-b border-collapse even:bg-WSAI-Indigo-25 odd:bg-WSAI-Indigo-25 border-WSAI-Indigo-50 gap-x-2'>
                    <h1 className='absolute top-0 mt-2 text-sm capitalize left-2 line-clamp-1'>
                      {message.teacherReciepient ? (
                        <p>
                          {`${message.teacherReciepient.firstName} ${message.teacherReciepient.lastName}`}
                        </p>
                      ) : (
                        `${message.studentReciepient.firstName} ${message.studentReciepient.lastName}`
                      )}
                    </h1>
                    <div className='relative flex flex-col items-center '>
                      <figure className='relative overflow-hidden border-2 rounded-full w-14 h-14 border-WSAI-Indigo-400'>
                        <Image
                          layout='fill'
                          src={
                            (message.teacherReciepient &&
                              message.teacherReciepient.image) ||
                            (message.studentReciepient &&
                              message.studentReciepient.image) ||
                            '/avatar.png'
                          }
                          alt='receiver'
                        />
                      </figure>
                    </div>
                    <div className='flex flex-col justify-center text-sm'>
                      <p className='font-bold line-clamp-1'>
                        <span className='font-normal'>Subject:</span>{' '}
                        {message.subject}
                      </p>
                      <p className='break-all line-clamp-1'>
                        {message.content}
                      </p>
                    </div>
                  </a>
                </Link>
              )
            })}

        <div className='absolute bottom-0 grid w-full h-12 grid-cols-2'>
          <a
            onClick={() =>
              router.replace(
                `/messages/teacher/${router.query.teacherId}/?message=received`
              )
            }
            className={`cursor-pointer flex items-center justify-center transition-colors border border-l-0 border-r-0 rounded-none shadow-inner focus:outline-none focus:ring  text-WSAI-Indigo-25 border-WSAI-Indigo-300 ${
              router.query.message == null || router.query.message == 'received'
                ? 'bg-WSAI-Indigo-500 font-bold'
                : 'bg-WSAI-Indigo-200 hover:bg-WSAI-Indigo-500'
            } `}
          >
            Received
          </a>
          <a
            onClick={() =>
              router.replace(
                `/messages/teacher/${router.query.teacherId}/?message=sent`
              )
            }
            className={`cursor-pointer flex items-center justify-center transition-colors border border-r-0 rounded-none shadow-inner focus:outline-none focus:ring  text-WSAI-Indigo-25 border-WSAI-Indigo-300 ${
              router.query.message == 'sent'
                ? 'bg-WSAI-Indigo-500 font-bold'
                : 'bg-WSAI-Indigo-200 hover:bg-WSAI-Indigo-500'
            } `}
          >
            Sent
          </a>
        </div>
      </main>

      {/* <main className="grid grid-cols-3">
        <header className="flex  col-span-3 items-center justify-center w-full h-[5.5rem] px-4 border-b border-WSAI-Indigo-100">
          <h1 className="text-3xl text-WSAI-Indigo-500">New Message</h1>
        </header>
      </main> */}
    </div>
  )
}

export default UserProfile
