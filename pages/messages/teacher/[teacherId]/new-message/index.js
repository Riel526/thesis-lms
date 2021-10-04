import { useState, useContext } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import FilledButton from '../../../../../components/Buttons/FilledButton'
import BorderedButton from '../../../../../components/Buttons/BorderedButton'
import AppContext from '../../../../../components/context/AppContext'
import { AddIcon, CaretLeft } from '../../../../../components/Icons/Icons'
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
    },
  }
}

const NewMessage = (props) => {
  const router = useRouter()

  const [studentReciepient, setStudentReciepient] = useState([])
  const [teacherReciepient, setTeacherReciepient] = useState([])

  const handleSelectStudent = (selectedItem) => {
    setStudentReciepient((prevState) => [...prevState, selectedItem])
  }

  const handleDiselectStudent = (selectedItem) => {
    studentReciepient.filter((student) => student._id != selectedItem._id)
  }

  const handleSelectTeacher = (selectedItem) => {
    setTeacherReciepient((prevState) => [...prevState, selectedItem])
  }

  const handleDiselectTeacher = (selectedItem) => {
    teacherReciepient.filter((teacher) => teacher._id != selectedItem._id)
  }

  return (
    <div className="flex flex-col w-full bg-WSAI-Indigo-25 text-WSAI-JetBlack">
      <header className="flex items-center justify-between w-full h-[5.5rem] px-4 border-b border-WSAI-Indigo-100">
        <a
          onClick={router.back}
          className="flex items-center justify-center bg-transparent rounded-full cursor-pointer w-7 h-7 justify-self-end"
        >
          <CaretLeft className="w-8 h-8 fill-current text-WSAI-Indigo-500" />
        </a>

        <h1 className="text-3xl text-WSAI-Indigo-500">Send Message</h1>
      </header>
      <main className="relative flex flex-col flex-1">
        <div className="flex items-center w-full p-4 border-b gap-x-4 h-14 border-WSAI-Indigo-100">
          <div className="flex items-center w-1/2 gap-x-6">
            <label className="w-28" htmlFor="Reciepient">
              Reciepient Student:
            </label>
            <Multiselect
              id="Select Student"
              onSelect={(selectedList, selectedItem) =>
                handleSelectStudent(selectedItem)
              }
              onRemove={(selectedList, selectedItem) =>
                handleDiselectStudent(selectedItem)
              }
              selectionLimit={3}
              displayValue="name"
              avoidHighlightFirstOption={true}
              options={props.studentOptions}
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
                  background: '#2a379f',
                },
              }}
            />
          </div>
          <div className="flex items-center w-1/2 gap-x-6 truncat">
            <label className="w-28" htmlFor="Reciepient">
              Reciepient Teacher:
            </label>
            <Multiselect
              id="Select Student"
              onSelect={(selectedList, selectedItem) =>
                handleSelectTeacher(selectedItem)
              }
              onRemove={(selectedList, selectedItem) =>
                handleDiselectTeacher(selectedItem)
              }
              displayValue="name"
              avoidHighlightFirstOption={true}
              options={props.teacherOptions}
              selectionLimit={3}
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
                  background: '#2a379f',
                },
              }}
            />
          </div>
        </div>
        <div className="flex items-center w-full p-4 border-b gap-x-4 h-14 border-WSAI-Indigo-100">
          <label className="w-28" htmlFor="Reciepient">
            Subject:
          </label>
          <input
            id="Reciepient"
            type="text"
            className="p-1.5 shadow-inner bg-WSAI-Indigo-100 rounded-md focus:outline-none focus:ring w-full"
          />
        </div>
        <form className="contents" onSubmit={(e) => handleSubmit(e)}>
          <textarea className="flex-1 w-full h-full p-2 shadow-inner resize-none bg-WSAI-Indigo-25 focus:outline-none focus:ring focus:ring-inset" />
          <button className="absolute h-12 rounded-md shadow w-36 bottom-4 right-4 bg-WSAI-Indigo-200">
            Send
          </button>
        </form>
      </main>
    </div>
  )
}

export default NewMessage
