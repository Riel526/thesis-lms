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
  const session = await getSession({ req: context.req })

  if (teacherId != session.user._id) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  let sender = ''

  if (context.query.teacher) {
    sender = await fetch(
      `${process.env.BASE_URL}/api/teachers/${context.query.teacher}?select=_id firstName lastName`
    )
      .then((res) => res.json())
      .then((json) => json.data)
  }

  if (context.query.student) {
    sender = await fetch(
      `${process.env.BASE_URL}/api/students?select=_id firstName lastName`
    )
      .then((res) => res.json())
      .then((json) => json.data)
  }

  const teachers = await fetch(
    `${process.env.BASE_URL}/api/teachers?select=_id firstName lastName`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  const students = await fetch(
    `${process.env.BASE_URL}/api/students?select=_id firstName lastName`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  const getOptions = (records) => {
    const options = records.map((record) => {
      if (record._id != session.user._id) {
        return {
          _id: record._id,
          name: `${record.firstName} ${record.lastName}`,
        }
      }
      return null
    })

    return options.filter((option) => option != null)
  }

  const teacherOptions = [...getOptions(teachers)]
  const studentOptions = [...getOptions(students)]

  return {
    props: {
      teacherOptions,
      studentOptions,
      session,
      sender,
    },
  }
}

const NewMessage = (props) => {
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState({
    content: '',
    file: '',
    subject: '',
    sender: props.session.user._id,
    studentReciepient: router.query.student ? router.query.student : null,
    teacherReciepient: router.query.teacher ? router.query.teacher : null,
  })
  const [selectedStudent, setSelectedStudent] = useState(
    router.query.student && [
      {
        _id: props.sender._id,
        name: `${props.sender.firstName} ${props.sender.lastName}`,
      },
    ]
  )
  const [selectedTeacher, setSelectedTeacher] = useState(
    router.query.teacher && [
      {
        _id: props.sender._id,
        name: `${props.sender.firstName} ${props.sender.lastName}`,
      },
    ]
  )

  const { uploadFiles, setModalAttributes } = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setModalAttributes({
      isOpen: true,
      status: 'loading',
      customMessage: '',
    })

    if (
      (selectedStudent != null && selectedTeacher == null) ||
      (selectedTeacher != null && selectedStudent == null)
    ) {
      uploadFiles(
        `${process.env.BASE_URL}/api/messages?role=teacher`,
        message,
        file,
        'Messages',
        false
      )
      resetFields()
    } else {
      setModalAttributes({
        isOpen: true,
        status: 'error',
        customMessage: 'Please send to one student or teacher',
      })
    }
  }

  const handleSelectStudent = (selectedList, selectedItem) => {
    setSelectedStudent(selectedList)
    setMessage((prevState) => ({
      ...prevState,
      studentReciepient: selectedItem._id,
    }))
  }

  const handleDiselectStudent = (selectedList, selectedItem) => {
    setMessage((prevState) => ({
      ...prevState,
      studentReciepient: '',
    }))
    setSelectedStudent(null)
  }

  const handleSelectTeacher = (selectedList, selectedItem) => {
    setSelectedTeacher(selectedList)
    setMessage((prevState) => ({
      ...prevState,
      teacherReciepient: selectedItem._id,
    }))
  }

  const handleDiselectTeacher = (selectedList, selectedItem) => {
    setMessage((prevState) => ({
      ...prevState,
      teacherReciepient: '',
    }))
    setSelectedTeacher(null)
  }

  const resetFields = () => {
    setMessage({
      content: '',
      file: '',
      subject: '',
      sender: props.session.user._id,
      studentReciepient: null,
      teacherReciepient: null,
    })
    setSelectedStudent(null)
    setSelectedTeacher(null)
    setFile('')
  }

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
            Send Message
          </h1>
          <p>Choose one student or teacher only.</p>
        </div>
      </header>
      <main className='relative flex flex-col flex-1'>
        <div className='flex items-center w-full p-4 border-b gap-x-4 h-14 border-WSAI-Indigo-100'>
          <div className='flex items-center w-1/2 gap-x-[1.6rem]'>
            <label className='w-28' htmlFor='Student Reciepient'>
              Reciepient Student:
            </label>
            <Multiselect
              id='Student Reciepient'
              onSelect={(selectedList, selectedItem) =>
                handleSelectStudent(selectedList, selectedItem)
              }
              onRemove={(selectedList, selectedItem) =>
                handleDiselectStudent(selectedList, selectedItem)
              }
              displayValue='name'
              disable={message.teacherReciepient && true}
              selectedValues={selectedStudent}
              avoidHighlightFirstOption={true}
              options={props.studentOptions}
              selectionLimit={1}
              style={{
                multiselectContainer: {
                  color: '#585A6B',
                  padding: '0px',
                },
                searchBox: {
                  backgroundColor: '#D3D6ED',
                  border: 'none',
                },
                optionContainer: {
                  backgroundColor: '#EDE9FE',
                  zIndex: '100',
                },
                chips: {
                  background: '#AAB0DE',
                },
              }}
            />
          </div>
          <div className='flex items-center w-1/2 gap-x-6 truncat'>
            <label className='w-28' htmlFor='Teacher Reciepient'>
              Reciepient Teacher:
            </label>
            <Multiselect
              id='Teacher Reciepient'
              onSelect={(selectedList, selectedItem) =>
                handleSelectTeacher(selectedList, selectedItem)
              }
              onRemove={(selectedList, selectedItem) =>
                handleDiselectTeacher(selectedList, selectedItem)
              }
              displayValue='name'
              avoidHighlightFirstOption={true}
              options={props.teacherOptions}
              selectionLimit={1}
              selectedValues={selectedTeacher}
              disable={message.studentReciepient && true}
              style={{
                multiselectContainer: {
                  color: '#585A6B',
                  padding: '0px',
                },
                searchBox: {
                  backgroundColor: '#D3D6ED',
                  border: 'none',
                  boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                  maxHeight: '2.5rem',

                  textOverFlow: 'ellipsis',
                },
                optionContainer: {
                  backgroundColor: '#EDE9FE',
                  zIndex: '100',
                },
                chips: {
                  background: '#AAB0DE',
                },
              }}
            />
          </div>
        </div>
        <div className='flex items-center w-full p-4 border-b gap-x-4 h-14 border-WSAI-Indigo-100'>
          <label className='w-28' htmlFor='Subject'>
            Subject:
          </label>
          <input
            onChange={(e) =>
              setMessage((prevState) => ({
                ...prevState,
                subject: e.target.value,
              }))
            }
            maxLength={50}
            value={message.subject}
            required
            id='Subject'
            type='text'
            className='p-1.5 shadow-inner bg-WSAI-Indigo-100 rounded-md focus:outline-none focus:ring w-full'
          />
        </div>
        <form className='contents' onSubmit={(e) => handleSubmit(e)}>
          <textarea
            onChange={(e) =>
              setMessage((prevState) => ({
                ...prevState,
                content: e.target.value,
              }))
            }
            value={message.content}
            required
            maxLength={4500}
            className='flex-1 w-full h-full p-2 border-b shadow-inner resize-none border-WSAI-Indigo-100 bg-WSAI-Indigo-25 focus:outline-none focus:ring focus:ring-inset'
          />
          <div className='flex items-center justify-end m-4 gap-x-4'>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type='file'
              id='Attach File'
              name='attachFile'
              className='hidden'
            />
            {file && (
              <div className='text-sm font-bold text-WSAI-Indigo-300'>
                Attached: {file.name}
              </div>
            )}
            <label
              tabIndex={0}
              htmlFor='Attach File'
              className='flex items-center justify-center w-8 h-8 transition-colors rounded-full cursor-pointer focus:ring focus:outline-none bg-WSAI-Indigo-100 hover:bg-WSAI-Indigo-400 hover:text-WSAI-Indigo-25'
            >
              <AttachFileIcon className='w-4 h-5 fill-current' />
            </label>
            <button className='h-12 rounded-md shadow w-36 bg-WSAI-Indigo-150 focus:outline-none focus:ring hover:-translate-y-1.5 hover:shadow-md transition-transform ease-out'>
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default NewMessage
