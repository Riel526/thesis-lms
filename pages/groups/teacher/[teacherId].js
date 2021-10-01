import { useState, useContext } from 'react'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import FilledButton from '../../../components/Buttons/FilledButton'
import BorderedButton from '../../../components/Buttons/BorderedButton'
import AppContext from '../../../components/context/AppContext'
import SchoolGroupModal from '../../../components/Modal/SchoolGroupModal'

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
          id: record._id,
          name: `${record.firstName} ${record.lastName}`,
        }
      }
      return null
    })

    return options.filter((option) => option != null)
  }

  const options = [...getOptions(teachers), ...getOptions(students)]

  const userInformation = await fetch(
    `${process.env.BASE_URL}/api/teachers/${teacherId}`
  )
    .then((res) => res.json())
    .then((json) => json.data)

  return {
    props: {
      userInformation,
      options,
    },
  }
}

const UserProfile = (props) => {
  const router = useRouter()

  const { setModalAttributes, updateData} =
    useContext(AppContext)

  const [isOpen, setIsOpen] = useState(false)
  const [isJoinGroup, setIsJoinGroup] = useState(false)

  const [session, loading] = useSession()

  return (
    <div className="grid w-full grid-cols-4 bg-WSAI-Indigo-25">
      <SchoolGroupModal
        options={props.options}
        isJoinGroup={isJoinGroup}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setModalAttributes={setModalAttributes}
      />
      <aside className="flex flex-col items-center w-full h-full col-span-1 p-4 border-r border-WSAI-Indigo-100 ">
        <h1 className="text-3xl text-WSAI-Indigo-500">Your Groups</h1>
      </aside>
      <main className="w-full h-full col-span-3 ">
        <header className="flex items-center h-20 px-4 border-b border-WSAI-Indigo-100">
          <div className="flex items-end justify-end w-full gap-x-4">
            <BorderedButton
              onClick={(e) => {
                setIsJoinGroup(true)
                setIsOpen(true)
              }}
            >
              Join Group
            </BorderedButton>
            <FilledButton
              onClick={(e) => {
                setIsJoinGroup(false)
                setIsOpen(true)
              }}
              className="h-10"
            >
              Create Group
            </FilledButton>
          </div>
        </header>
        <div className="p-4 "></div>
      </main>
    </div>
  )
}

export default UserProfile
